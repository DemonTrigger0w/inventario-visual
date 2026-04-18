package handlers

import (
	"Inventario_Visual/database"
	"Inventario_Visual/models"

	"github.com/gin-gonic/gin"
)

func EliminarAsset(c *gin.Context) {
	id := c.Request.FormValue("ID")

	db := database.GetDB()
	var Asset models.Asset

	if db.Delete(&Asset, id).Error != nil {
		c.JSON(400, gin.H{
			"error": "error al eliminar el activo",
		})
	}

	c.JSON(200, gin.H{
		"success": true,
	})
}
