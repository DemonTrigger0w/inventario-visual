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

	db.Delete(&Asset, id)

	c.JSON(200, gin.H{
		"success": true,
	})
}
