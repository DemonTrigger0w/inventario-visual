package utils

import (
	"crypto/sha256"
	"encoding/hex"
)

func CompararClave(clave string, claveEncriptada string) bool {
	comparacion := EncriptarClave(clave)
	return comparacion == claveEncriptada
}

func EncriptarClave(clave string) string {
	hash := sha256.New()
	hash.Write([]byte(clave))
	valorHash := hex.EncodeToString(hash.Sum(nil))

	return valorHash
}
