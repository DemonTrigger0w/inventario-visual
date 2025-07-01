package handlers

import (
	"Inventario_Visual/database"
	"Inventario_Visual/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func ObtenerImagen(c *gin.Context) {
	idUser := c.Request.FormValue("userId")

	id, err := strconv.Atoi(idUser)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Ha ocurrido un error obteniendo el ID del usuario",
		})
		return
	}

	db := database.GetDB()
	var img models.Imagen
	result := db.First(&img, id)

	if result.Error != nil {
		c.JSON(400, gin.H{
			"error": "Imagen no encontrada",
		})
		return
	}

	c.File(img.Ruta)

}
