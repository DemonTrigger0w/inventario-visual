package handlers

import (
	"Inventario_Visual/database"
	"Inventario_Visual/models"
	"fmt"

	"github.com/gin-gonic/gin"
)

/* func ObtenerImagenes(c *gin.Context) {
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

*/

func ObtenerImagenes(c *gin.Context) {
	db := database.GetDB()

	var Asset models.Asset

	asset := db.Preload("Provider").Preload("provider.Brand").Preload("provider.Models").Preload("provider.Serial").Find(&Asset)
	if asset.Error != nil {
		c.JSON(400, gin.H{
			"error": "Activos no encontrados",
		})
		return
	}

	fmt.Println(Asset)

	// c.JSON(http.StatusOK, Asset)
}
