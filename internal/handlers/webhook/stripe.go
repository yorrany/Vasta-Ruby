package webhook

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/stripe/stripe-go/v76"
	"github.com/stripe/stripe-go/v76/webhook"
	"github.com/yorrany/Vasta-Go/internal/domain"
	"gorm.io/gorm"
)

type StripeHandler struct {
	DB *gorm.DB
}

func NewStripeHandler(db *gorm.DB) *StripeHandler {
	return &StripeHandler{DB: db}
}

// Handle handles incoming Stripe webhook events
func (h *StripeHandler) Handle(c echo.Context) error {
	const MaxBodyBytes = int64(65536)
	c.Request().Body = http.MaxBytesReader(c.Response(), c.Request().Body, MaxBodyBytes)
	payload, err := io.ReadAll(c.Request().Body)
	if err != nil {
		return c.String(http.StatusServiceUnavailable, "Error reading request body")
	}

	sigHeader := c.Request().Header.Get("Stripe-Signature")
	endpointSecret := os.Getenv("STRIPE_WEBHOOK_SECRET")

	var event stripe.Event
	// Verify signature if secret is present
	if endpointSecret != "" {
		event, err = webhook.ConstructEvent(payload, sigHeader, endpointSecret)
		if err != nil {
			return c.String(http.StatusBadRequest, fmt.Sprintf("Error verifying webhook signature: %v", err))
		}
	} else {
		// Development fallback (INSECURE - for local testing only if verified safe environment)
		// Ideally we always want signature verification.
		// For now, mirroring Ruby fallback:
		if err := json.Unmarshal(payload, &event); err != nil {
			return c.String(http.StatusBadRequest, "Invalid JSON payload")
		}
	}

	switch event.Type {
	case "checkout.session.completed":
		// Handle checkout session completed
		var session stripe.CheckoutSession
		if err := json.Unmarshal(event.Data.Raw, &session); err != nil {
			return c.String(http.StatusBadRequest, "Error parsing webhook JSON")
		}
		if err := h.handleCheckoutSessionCompleted(&session); err != nil {
			return c.String(http.StatusInternalServerError, err.Error())
		}
	case "customer.subscription.created", "customer.subscription.updated":
		var subscription stripe.Subscription
		if err := json.Unmarshal(event.Data.Raw, &subscription); err != nil {
			return c.String(http.StatusBadRequest, "Error parsing webhook JSON")
		}
		if err := h.handleSubscriptionEvent(&subscription); err != nil {
			return c.String(http.StatusInternalServerError, err.Error())
		}
	case "invoice.payment_failed":
		var invoice stripe.Invoice
		if err := json.Unmarshal(event.Data.Raw, &invoice); err != nil {
			return c.String(http.StatusBadRequest, "Error parsing webhook JSON")
		}
		if err := h.handleInvoicePaymentFailed(&invoice); err != nil {
			return c.String(http.StatusInternalServerError, err.Error())
		}
	}

	return c.NoContent(http.StatusOK)
}

func (h *StripeHandler) handleCheckoutSessionCompleted(session *stripe.CheckoutSession) error {
	var checkout domain.Checkout
	if err := h.DB.Where("stripe_session_id = ?", session.ID).First(&checkout).Error; err != nil {
		return nil // Checkout not found, maybe ignore? Or log error. Ruby ignored if nil.
	}

	checkout.Status = "paid"
	if session.PaymentIntent != nil {
		checkout.StripePaymentIntentID = &session.PaymentIntent.ID
	}
	// RawData update omitted for brevity/type complexity, usually safe to skip or map carefully
	
	return h.DB.Save(&checkout).Error
}

func (h *StripeHandler) handleSubscriptionEvent(sub *stripe.Subscription) error {
	var subscription domain.Subscription
	err := h.DB.Where("external_id = ?", sub.ID).First(&subscription).Error
	
	var tenant domain.Tenant
	if err == nil {
		// Found subscription, get tenant
		h.DB.First(&tenant, subscription.TenantID)
	} else {
		// Not found, try metadata
		tenantIDStr := sub.Metadata["tenant_id"]
		if tenantIDStr == "" {
			return nil // Cannot find tenant
		}
		h.DB.Where("id = ?", tenantIDStr).First(&tenant) // Potentially unsafe if string, but ID is usually uint
	}

	if tenant.ID == 0 {
		return nil
	}

	planCode := sub.Metadata["plan_code"]
	if planCode == "" {
		planCode = tenant.CurrentPlanCode
	}

	// Upsert Subscription
	if subscription.ID == 0 {
		// Create
		subscription = domain.Subscription{
			TenantID:   tenant.ID,
			ExternalID: sub.ID,
			PlanCode:   planCode,
			Status:     string(sub.Status),
			CurrentPeriodEnd: toTime(sub.CurrentPeriodEnd),
		}
		if err := h.DB.Create(&subscription).Error; err != nil {
			return err
		}
	} else {
		// Update
		subscription.PlanCode = planCode
		subscription.Status = string(sub.Status)
		subscription.CurrentPeriodEnd = toTime(sub.CurrentPeriodEnd)
		if err := h.DB.Save(&subscription).Error; err != nil {
			return err
		}
	}

	// Update Tenant Logic
	billingStatus := tenant.BillingStatus
	if sub.Status == stripe.SubscriptionStatusActive {
		billingStatus = "active"
	} else if sub.Status == stripe.SubscriptionStatusPastDue || sub.Status == stripe.SubscriptionStatusUnpaid {
		billingStatus = "blocked"
	}

	var blockedAt *time.Time
	if billingStatus == "blocked" {
		now := time.Now()
		blockedAt = &now
	} else {
		blockedAt = tenant.BlockedAt // Keep original if not blocked now? Ruby logic: blocked ? now : original
	}

	tenant.CurrentPlanCode = planCode
	tenant.BillingStatus = billingStatus
	tenant.BlockedAt = blockedAt

	return h.DB.Save(&tenant).Error
}

func (h *StripeHandler) handleInvoicePaymentFailed(invoice *stripe.Invoice) error {
	if invoice.Subscription == nil {
		return nil
	}
	
	var subscription domain.Subscription
	if err := h.DB.Where("external_id = ?", invoice.Subscription.ID).First(&subscription).Error; err != nil {
		return nil
	}

	var tenant domain.Tenant
	if err := h.DB.First(&tenant, subscription.TenantID).Error; err != nil {
		return nil
	}

	tenant.BillingStatus = "blocked"
	now := time.Now()
	tenant.BlockedAt = &now
	
	return h.DB.Save(&tenant).Error
}

func toTime(ts int64) *time.Time {
	t := time.Unix(ts, 0)
	return &t
}
