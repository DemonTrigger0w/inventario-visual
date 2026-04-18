package handlers

import (
	"Inventario_Visual/database"
	"Inventario_Visual/models"

	"github.com/gin-gonic/gin"
)

func Guardarinventario(c *gin.Context) {
	db := database.GetDB()

	type saveactive struct {
		Nombre      string `json:"nombre"`
		Serial      string `json:"serial"`
		Modelo      string `json:"modelo"`
		Marca       string `json:"marca"`
		Estado      string `json:"estado"`
		Color       string `json:"color"`
		Descripcion string `json:"descripcion"`
	}

	var data saveactive

	err := c.ShouldBindJSON(&data)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "error al obtener la informacion",
		})
		return
	}

	Asset := models.Asset{
		Name:        data.Nombre,
		Description: data.Descripcion,

		Status: models.Status{
			Name: data.Estado,
		},

		Provider: models.Provider{
			Serial: data.Serial,
			Brand:  data.Marca,
			Models: data.Modelo,
			Color:  data.Color,
		},
	}

	err = db.Create(&Asset).Error
	if err != nil {
		c.JSON(400, gin.H{"error": "activo no guardado"})
		return
	}

	c.JSON(200, gin.H{"success": "activo guardado exitosamente"})

}
