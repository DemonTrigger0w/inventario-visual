package handlers

import (
	"Inventario_Visual/database"
	"Inventario_Visual/models"

	"github.com/gin-gonic/gin"
)

func Guardarinventario(c *gin.Context) {
	db := database.GetDB()
	nombre := c.Request.FormValue("nombre")
	serial := c.Request.FormValue("serial")
	modelo := c.Request.FormValue("modelo")
	marca := c.Request.FormValue("marca")
	estado := c.Request.FormValue("estado")
	color := c.Request.FormValue("color")
	descripcion := c.Request.FormValue("descripcion")

	status := models.Status{
		Name: estado,
	}

	err := db.Create(&status).Error
	if err != nil {
		c.JSON(500, gin.H{"error": "activo no guardado"})
		return
	}

	provider := models.Provider{
		Serial: serial,
		Brand:  marca,
		Models: modelo,
		Color:  color,
	}

	err = db.Create(&provider).Error
	if err != nil {
		c.JSON(500, gin.H{"error": "activo no guardado"})
		return
	}

	Asset := models.Asset{
		Name:        nombre,
		Description: descripcion,
		StatusID:    status.ID,
		ProviderID:  provider.ID,
	}

	err = db.Create(&Asset).Error
	if err != nil {
		c.JSON(500, gin.H{"error": "activo no guardado"})
		return
	}

	c.JSON(200, gin.H{"success": "activo guardado exitosamente"})

}
