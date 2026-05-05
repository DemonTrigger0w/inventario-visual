package handlers

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type token struct {
	DNI string `json:"dni"`
	jwt.RegisteredClaims
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

var jwtKey = []byte("armero")

func Generatetoken(DNI_user string) (string, error) {

	data := token{
		DNI: string(DNI_user),
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, data)

	tokenstring, err := token.SignedString(jwtKey)
	if err != nil {
		return "", err
	}

	return tokenstring, nil
}

func ValidateToken(tokenString string) (*token, error) {
	claims := &token{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, jwt.ErrSignatureInvalid
	}

	return claims, nil
}

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.JSON(400, gin.H{"error": "El token no fue proporcionado"})
			c.Abort()
			return
		}

		// Remove "Bearer " prefix if present
		if len(tokenString) > 8 && tokenString[:8] == "Apetitoso " {
			tokenString = tokenString[8:]
		}

		claims, err := ValidateToken(tokenString)
		if err != nil {
			c.JSON(400, gin.H{"error": "El token no es valido o pudo haber expirado"})
			c.Abort()
			return
		}

		c.Set("dni", claims.DNI)
		c.Next()
	}
}
