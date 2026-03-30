package handlers

import (
	"Inventario_Visual/database"
	"Inventario_Visual/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ObtenerImagenes(c *gin.Context) {
	db := database.GetDB()

	var assets []models.Asset

	result := db.Preload("Provider").Preload("Status").Preload("Area").Find(&assets)
	if result.Error != nil {
		c.JSON(400, gin.H{
			"error": "Activos no encontrados",
		})
		return
	}

	c.JSON(http.StatusOK, assets)
}
