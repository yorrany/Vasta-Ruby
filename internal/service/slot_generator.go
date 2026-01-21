package service

import (
	"context"
	"fmt"
	"time"

	"github.com/yorrany/Vasta-Go/internal/domain"
	"gorm.io/gorm"
)

// Slot represents a time slot.
type Slot struct {
	StartsAt time.Time `json:"starts_at"`
	EndsAt   time.Time `json:"ends_at"`
}

type SlotGenerator struct {
	db *gorm.DB
}

func NewSlotGenerator(db *gorm.DB) *SlotGenerator {
	return &SlotGenerator{db: db}
}

// GenerateSlots calculates available slots for a given offer on a specific date.
func (s *SlotGenerator) GenerateSlots(ctx context.Context, offerID uint64, date time.Time) ([]Slot, error) {
	// 1. Fetch ServiceAvailabilities for the weekday
	var availabilities []domain.ServiceAvailability
	weekday := int(date.Weekday())

	// Assumption: ServiceAvailability model needs to lead somewhere, but I didn't verify if I created it in models.go
	// In my models.go step, I did NOT create ServiceAvailability struct! I missed it in step 9/10 reading.
	// Ah, I need to check my models.go file again or creating it if missing.
	// Looking back at Step 29 output, I created: Tenant, User, Profile, Offer, Appointment, Subscription, Checkout, AuditLog.
	// I MISSED ServiceAvailability!
	// I must first update models.go to include ServiceAvailability.
	
	err := s.db.WithContext(ctx).
		Where("offer_id = ? AND active = ? AND weekday = ?", offerID, true, weekday).
		Find(&availabilities).Error

	if err != nil {
		return nil, fmt.Errorf("failed to fetch availabilities: %w", err)
	}

	var slots []Slot

	// Normalize date to start of day (00:00)
	baseDate := time.Date(date.Year(), date.Month(), date.Day(), 0, 0, 0, 0, date.Location())

	for _, availability := range availabilities {
		startTime := baseDate.Add(time.Duration(availability.StartMinute) * time.Minute)
		endTime := baseDate.Add(time.Duration(availability.EndMinute) * time.Minute)

		current := startTime
		duration := time.Duration(availability.DurationMinutes) * time.Minute

		for current.Add(duration).Before(endTime) || current.Add(duration).Equal(endTime) {
			slotStart := current
			slotEnd := current.Add(duration)

			free, err := s.isSlotFree(ctx, offerID, slotStart, slotEnd)
			if err != nil {
				return nil, err
			}

			if free {
				slots = append(slots, Slot{
					StartsAt: slotStart,
					EndsAt:   slotEnd,
				})
			}

			current = current.Add(duration)
		}
	}

	return slots, nil
}

func (s *SlotGenerator) isSlotFree(ctx context.Context, offerID uint64, start, end time.Time) (bool, error) {
	var count int64
	// Appointment overlaps: starts_at < slot_end AND ends_at > slot_start
	// Duration is in minutes in DB.
	// SQL: starts_at < ? AND (starts_at + interval) > ?
	
	err := s.db.WithContext(ctx).Model(&domain.Appointment{}).
		Where("offer_id = ?", offerID).
		Where("starts_at < ? AND (starts_at + (duration_minutes * interval '1 minute')) > ?", end, start).
		Count(&count).Error

	if err != nil {
		return false, fmt.Errorf("failed to check overlap: %w", err)
	}

	return count == 0, nil
}
