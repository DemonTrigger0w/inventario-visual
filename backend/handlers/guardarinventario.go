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

	Asset := models.Asset{
		Name:        nombre,
		Description: descripcion,
	}

	provider := models.Provider{
		Serial: serial,
		Brand:  marca,
		Models: modelo,
		Color:  color,
	}

	status := models.Status{
		Name: estado,
	}

	db.Create(&Asset).Create(&provider).Create(&status)

}
