package service

import (
	"context"
	"testing"
	"time"

	"github.com/yorrany/Vasta-Go/internal/domain"
	"gorm.io/driver/sqlite" // Assumption: Using sqlite for tests
	"gorm.io/gorm"
)

func TestSlotGenerator_GenerateSlots(t *testing.T) {
	// Setup In-Memory DB
	db, err := gorm.Open(sqlite.Open("file::memory:?cache=shared"), &gorm.Config{})
	if err != nil {
		t.Fatalf("failed to connect database: %v", err)
	}

	// Migrate schema
	db.AutoMigrate(&domain.ServiceAvailability{}, &domain.Appointment{})

	// Seed Data
	offerID := uint64(1)
	date := time.Now()
	weekday := int(date.Weekday())

	db.Create(&domain.ServiceAvailability{
		OfferID:         offerID,
		Weekday:         weekday,
		StartMinute:     540, // 09:00
		EndMinute:       600, // 10:00
		DurationMinutes: 30,
		Active:          true,
	})

	// Create an appointment that conflicts with the first slot (09:00 - 09:30)
	// Slot 1: 09:00 - 09:30
	// Slot 2: 09:30 - 10:00
	// Appointment: 09:15 - 09:45 (Overlaps both? No, overlaps 1st. 2nd starts at 9:30. 9:15 < 9:30 and 9:45 > 9:30, so overlaps 2nd too?)
	// DB logic: starts_at < slot_end AND ends_at > slot_start
	
	// Let's block the first slot only.
	// Appointment: 09:00 - 09:30
	baseDate := time.Date(date.Year(), date.Month(), date.Day(), 0, 0, 0, 0, date.Location())
	start900 := baseDate.Add(540 * time.Minute)
	
	db.Create(&domain.Appointment{
		OfferID:         offerID,
		StartsAt:        start900,
		DurationMinutes: 30,
		Status:          "scheduled",
	})

	sg := NewSlotGenerator(db)
	slots, err := sg.GenerateSlots(context.Background(), offerID, date)
	if err != nil {
		t.Errorf("GenerateSlots returned error: %v", err)
	}

	// Expecting 1 slot (09:30 - 10:00) because 09:00-09:30 is taken.
	// Actually: 
	// Slot 1: 09:00 - 09:30. Overlaps with Appt 09:00 - 09:30? YES.
	// Slot 2: 09:30 - 10:00. Overlaps? No.
	
	if len(slots) != 1 {
		t.Errorf("expected 1 slot, got %d", len(slots))
	}
	
	if len(slots) > 0 {
		expectedStart := start900.Add(30 * time.Minute)
		if !slots[0].StartsAt.Equal(expectedStart) {
			t.Errorf("expected slot start %v, got %v", expectedStart, slots[0].StartsAt)
		}
	}
}
