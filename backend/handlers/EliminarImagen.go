package handlers

import (
	"Inventario_Visual/database"
	"Inventario_Visual/models"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
)

func EliminarImagen(c *gin.Context) {
	idImg := c.Request.FormValue("idImg")

	id, err := strconv.Atoi(idImg)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Ha ocurrido una error obteniendo el ID",
		})
		return
	}

	db := database.GetDB()
	var ImagenEliminar models.Imagen
	result := db.First(&ImagenEliminar, id)

	if result.Error != nil {
		c.JSON(400, gin.H{
			"error": "Imagen no encontrada",
		})
		return
	}

	os.Remove(ImagenEliminar.Ruta)
	db.Delete(&ImagenEliminar)

	c.JSON(200, gin.H{
		"success": true,
	})
}
