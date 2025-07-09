package handlers

import (
	"Inventario_Visual/database"
	"Inventario_Visual/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ObtenerImagenes(c *gin.Context) {
	db := database.GetDB()

	var img []models.Imagen
	result := db.Find(&img)

	if result.Error != nil {
		c.JSON(400, gin.H{
			"error": "Imagen no encontrada",
		})
		return
	}

	c.JSON(http.StatusOK, img)
}
