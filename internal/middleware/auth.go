package middleware

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"github.com/spf13/viper"
)

// SupabaseAuth middleware validates the Bearer token against Supabase JWT secret
func SupabaseAuth() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			authHeader := c.Request().Header.Get("Authorization")
			if authHeader == "" {
				return echo.NewHTTPError(http.StatusUnauthorized, "Missing Authorization header")
			}

			tokenString := strings.TrimPrefix(authHeader, "Bearer ")
			if tokenString == authHeader {
				return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token format")
			}

			secret := viper.GetString("SUPABASE_JWT_SECRET")
			if secret == "" {
				// Fallback or error if not configured. For safety, error out.
				return echo.NewHTTPError(http.StatusInternalServerError, "JWT Secret not configured")
			}

			token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
				}
				return []byte(secret), nil
			})

			if err != nil || !token.Valid {
				return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
			}

			// Store user claims in context
			if claims, ok := token.Claims.(jwt.MapClaims); ok {
				c.Set("user", claims)
				// Extract 'sub' as user ID
				if sub, ok := claims["sub"].(string); ok {
					c.Set("user_id", sub)
				}
			}

			return next(c)
		}
	}
}
