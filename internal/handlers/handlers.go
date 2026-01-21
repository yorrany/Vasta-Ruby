package handlers

import (
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/yorrany/Vasta-Go/internal/domain"
	"github.com/yorrany/Vasta-Go/internal/service"
	"gorm.io/gorm"
)

type Handler struct {
	DB             *gorm.DB
	BillingService *service.BillingService
	SlotGenerator  *service.SlotGenerator
}

func NewHandler(db *gorm.DB, bs *service.BillingService, sg *service.SlotGenerator) *Handler {
	return &Handler{
		DB:             db,
		BillingService: bs,
		SlotGenerator:  sg,
	}
}

// GetPlans returns available plans
func (h *Handler) GetPlans(c echo.Context) error {
	// Mock implementation as Plans::Catalog wasn't fully visible
	plans := []map[string]interface{}{
		{
			"code": "start",
			"name": "Vasta Start",
			"monthly_price_cents": 0,
			"transaction_fee_percent": 8,
			"offer_limit": 3,
			"admin_user_limit": 1,
			"features": []string{"checkout_transparente", "suporte_email", "analytics_basico"},
		},
		{
			"code": "pro",
			"name": "Vasta Pro",
			"monthly_price_cents": 4990,
			"transaction_fee_percent": 4,
			"offer_limit": nil,
			"admin_user_limit": 1,
			"features": []string{"checkout_transparente", "suporte_email", "analytics_basico", "dominio_proprio", "sem_marca_dagua", "recuperacao_carrinho"},
		},
		{
			"code": "business",
			"name": "Vasta Business",
			"monthly_price_cents": 9990,
			"transaction_fee_percent": 1,
			"offer_limit": nil,
			"admin_user_limit": 5,
			"features": []string{"checkout_transparente", "suporte_email", "analytics_basico", "dominio_proprio", "sem_marca_dagua", "recuperacao_carrinho", "suporte_whatsapp", "api_aberta", "multiplos_estoques"},
		},
	}
	return c.JSON(http.StatusOK, plans)
}

// GetAppointments lists appointments
func (h *Handler) GetAppointments(c echo.Context) error {
	var appointments []domain.Appointment
	// TODO: Filter by Tenant/User from Context
	if err := h.DB.Find(&appointments).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, appointments)
}

// CreateAppointment creates a new appointment
func (h *Handler) CreateAppointment(c echo.Context) error {
	var req domain.Appointment
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
	}

	// Logic to save appointment
	if err := h.DB.Create(&req).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, req)
}

// GetSlots returns available slots (Using SlotGenerator)
func (h *Handler) GetSlots(c echo.Context) error {
	offerID := c.QueryParam("offer_id") // Convert to uint64... logic omitted for brevity
	dateStr := c.QueryParam("date")
	
	date, err := time.Parse("2006-01-02", dateStr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid date format"})
	}

	// Assuming OfferID 1 for demo if empty
	slots, err := h.SlotGenerator.GenerateSlots(c.Request().Context(), 1, date) 
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, slots)
}



// -- Offers --

// GetOffers lists offers for the current tenant
func (h *Handler) GetOffers(c echo.Context) error {
	var offers []domain.Offer
	// In a real implementation, we would extract TenantID from the JWT context
	// tenantID := c.Get("tenant_id").(uint64)
	tenantID := 1 // Hardcoded for demo until Auth integration is tighter
	
	if err := h.DB.Where("tenant_id = ?", tenantID).Find(&offers).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, offers)
}

// GetOffer retrieves a single offer
func (h *Handler) GetOffer(c echo.Context) error {
	id := c.Param("id")
	var offer domain.Offer
	if err := h.DB.First(&offer, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Offer not found"})
	}
	return c.JSON(http.StatusOK, offer)
}

// CreateOffer creates a new offer
func (h *Handler) CreateOffer(c echo.Context) error {
	var offer domain.Offer
	if err := c.Bind(&offer); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid payload"})
	}
	
	// Mock Plans::Enforcer check
	// ensure_offer_creation_allowed! logic would go here
	
	offer.TenantID = 1 // Hardcoded

	if err := h.DB.Create(&offer).Error; err != nil {
		return c.JSON(http.StatusUnprocessableEntity, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusCreated, offer)
}

// UpdateOffer updates an offer
func (h *Handler) UpdateOffer(c echo.Context) error {
	id := c.Param("id")
	var offer domain.Offer
	if err := h.DB.First(&offer, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Offer not found"})
	}

	if err := c.Bind(&offer); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid payload"})
	}

	if err := h.DB.Save(&offer).Error; err != nil {
		return c.JSON(http.StatusUnprocessableEntity, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, offer)
}

// DeleteOffer deletes an offer
func (h *Handler) DeleteOffer(c echo.Context) error {
	id := c.Param("id")
	if err := h.DB.Delete(&domain.Offer{}, id).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.NoContent(http.StatusNoContent)
}

// -- Profiles --

// CheckUsername checks availability of a slug
func (h *Handler) CheckUsername(c echo.Context) error {
	username := c.QueryParam("username")
	
	svc := service.NewProfileService(h.DB)
	resp, err := svc.CheckUsername(c.Request().Context(), username)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	
	if !resp.Available {
		// Matching Ruby behavior: 422 for unavailable
		return c.JSON(http.StatusUnprocessableEntity, resp)
	}
	return c.JSON(http.StatusOK, resp)
}

// -- Subscriptions --

// CreateSubscription initiates a subscription
func (h *Handler) CreateSubscription(c echo.Context) error {
	var body struct {
		PlanCode string `json:"plan_code"`
	}
	if err := c.Bind(&body); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid payload"})
	}

	// Assumption: tenant_id from auth context
	tenantID := uint64(1) // Demo

	sub, err := h.BillingService.CreateSubscription(c.Request().Context(), tenantID, body.PlanCode)
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, sub)
}

// -- Users --

// GetUsers lists users
func (h *Handler) GetUsers(c echo.Context) error {
	var users []domain.User
	tenantID := 1 // Demo
	if err := h.DB.Where("tenant_id = ?", tenantID).Find(&users).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, users)
}

// CreateUser creates a new user
func (h *Handler) CreateUser(c echo.Context) error {
	var user domain.User
	if err := c.Bind(&user); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid payload"})
	}
	user.TenantID = 1 // Demo
	if user.Role == "" {
		user.Role = "admin"
	}
	// Missing: Plans::Enforcer logic

	if err := h.DB.Create(&user).Error; err != nil {
		return c.JSON(http.StatusUnprocessableEntity, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusCreated, user)
}

// -- Service Availability --

// GetServiceAvailabilities lists availabilities for an offer
func (h *Handler) GetServiceAvailabilities(c echo.Context) error {
	offerID := c.QueryParam("offer_id")
	var avails []domain.ServiceAvailability
	if err := h.DB.Where("offer_id = ?", offerID).Find(&avails).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, avails)
}

// CreateServiceAvailability creates availability
func (h *Handler) CreateServiceAvailability(c echo.Context) error {
	var avail domain.ServiceAvailability
	if err := c.Bind(&avail); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid payload"})
	}
	avail.TenantID = 1 // Demo
	if err := h.DB.Create(&avail).Error; err != nil {
		return c.JSON(http.StatusUnprocessableEntity, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusCreated, avail)
}
