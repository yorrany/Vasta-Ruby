package service

import (
	"context"
	"fmt"
	"time"

	"github.com/spf13/viper"
	"github.com/stripe/stripe-go/v76"
	"github.com/yorrany/Vasta-Go/internal/domain"
	localStripe "github.com/yorrany/Vasta-Go/pkg/stripe"
	"gorm.io/gorm"
)

type BillingService struct {
	db           *gorm.DB
	stripeClient *localStripe.Client
}

func NewBillingService(db *gorm.DB, sc *localStripe.Client) *BillingService {
	return &BillingService{db: db, stripeClient: sc}
}

// CreateSubscription mirrors Billing::Stripe::SubscriptionCreator
func (s *BillingService) CreateSubscription(ctx context.Context, tenantID uint64, planCode string) (*domain.Subscription, error) {
	// 1. Fetch Tenant
	var tenant domain.Tenant
	if err := s.db.WithContext(ctx).First(&tenant, tenantID).Error; err != nil {
		return nil, fmt.Errorf("tenant not found: %w", err)
	}

	// 2. Sync Customer
	customerID, err := s.syncCustomer(ctx, &tenant)
	if err != nil {
		return nil, err
	}

	// 3. Get Price ID (Mocking Env lookup)
	priceID := viper.GetString(fmt.Sprintf("STRIPE_PRICE_%s", planCode))
	if priceID == "" {
		return nil, fmt.Errorf("missing stripe price for plan %s", planCode)
	}

	// 4. Create Stripe Subscription
	params := &stripe.SubscriptionParams{
		Customer: stripe.String(customerID),
		Items: []*stripe.SubscriptionItemsParams{
			{
				Price: stripe.String(priceID),
			},
		},
	}
	params.AddMetadata("tenant_id", fmt.Sprintf("%d", tenant.ID))
	params.AddMetadata("plan_code", planCode)

	sub, err := s.stripeClient.SC.Subscriptions.New(params)
	if err != nil {
		return nil, fmt.Errorf("stripe error: %w", err)
	}

	// 5. Create Subscription Record
	subscription := &domain.Subscription{
		TenantID:         tenant.ID,
		ExternalID:       sub.ID,
		PlanCode:         planCode,
		Status:           string(sub.Status),
		CurrentPeriodEnd: toTime(sub.CurrentPeriodEnd),
		RawData:          map[string]interface{}{"id": sub.ID, "status": sub.Status}, // Simplified raw data
	}

	tx := s.db.WithContext(ctx).Begin()
	if err := tx.Create(subscription).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	// 6. Update Tenant
	tenant.CurrentPlanCode = planCode
	tenant.BillingStatus = string(sub.Status)
	if sub.Status != stripe.SubscriptionStatusActive {
		tenant.BillingStatus = "pending"
	}
	if err := tx.Save(&tenant).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	tx.Commit()
	return subscription, nil
}

func (s *BillingService) syncCustomer(ctx context.Context, tenant *domain.Tenant) (string, error) {
	if tenant.StripeCustomerID != nil && *tenant.StripeCustomerID != "" {
		return *tenant.StripeCustomerID, nil
	}

	params := &stripe.CustomerParams{
		Name: stripe.String(tenant.Name),
	}
	params.AddMetadata("tenant_id", fmt.Sprintf("%d", tenant.ID))

	c, err := s.stripeClient.SC.Customers.New(params)
	if err != nil {
		return "", err
	}

	tenant.StripeCustomerID = &c.ID
	if err := s.db.WithContext(ctx).Save(tenant).Error; err != nil {
		return "", err
	}

	return c.ID, nil
}

func toTime(ts int64) *time.Time {
	t := time.Unix(ts, 0)
	return &t
}
