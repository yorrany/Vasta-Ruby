package service

import (
	"context"
	"fmt"
	"strings"

	"github.com/yorrany/Vasta-Go/internal/domain"
	"gorm.io/gorm"
)

type ProfileService struct {
	db *gorm.DB
}

func NewProfileService(db *gorm.DB) *ProfileService {
	return &ProfileService{db: db}
}

type CheckUsernameResponse struct {
	Available   bool     `json:"available"`
	Username    string   `json:"username"`
	Message     string   `json:"message"`
	Suggestions []string `json:"suggestions"`
}

func (s *ProfileService) CheckUsername(ctx context.Context, username string) (*CheckUsernameResponse, error) {
	username = strings.ToLower(strings.TrimSpace(username))
	if len(username) < 3 {
		return &CheckUsernameResponse{Available: false, Username: username, Message: "Mínimo 3 caracteres"}, nil
	}

	reserved := []string{"admin", "support", "help", "root", "system", "vasta", "api", "dashboard", "login", "register"}
	isReserved := false
	for _, r := range reserved {
		if r == username {
			isReserved = true
			break
		}
	}

	var exists bool
	if err := s.db.WithContext(ctx).Model(&domain.Profile{}).Select("count(*) > 0").Where("slug = ?", username).Find(&exists).Error; err != nil {
		return nil, err
	}

	available := !exists && !isReserved
	
	var suggestions []string
	if !available {
		baseSuggestions := []string{
			fmt.Sprintf("%spro", username),
			fmt.Sprintf("%shq", username),
			fmt.Sprintf("sou%s", username),
			fmt.Sprintf("%s_dev", username),
		}

		for _, sugg := range baseSuggestions {
			var suggExists bool
			s.db.WithContext(ctx).Model(&domain.Profile{}).Select("count(*) > 0").Where("slug = ?", sugg).Find(&suggExists)
			if !suggExists {
				suggestions = append(suggestions, sugg)
			}
			if len(suggestions) >= 3 {
				break
			}
		}
	}

	msg := "indisponível"
	if available {
		msg = "Disponível!"
	}

	return &CheckUsernameResponse{
		Available:   available,
		Username:    username,
		Message:     msg,
		Suggestions: suggestions,
	}, nil
}
