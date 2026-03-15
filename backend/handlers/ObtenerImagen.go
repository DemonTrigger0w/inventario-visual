package handlers

import (
	"Inventario_Visual/database"
	"Inventario_Visual/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ObtenerImagenes(c *gin.Context) {
	db := database.GetDB()

	var Asset models.Asset

	asset := db.Find(&Asset).Preload("ProviderID")
	if asset.Error != nil {
		c.JSON(400, gin.H{
			"error": "Activos no encontrados",
		})
		return
	}

	c.JSON(http.StatusOK, Asset)
}
