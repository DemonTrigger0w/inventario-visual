package handlers

import (
	"Inventario_Visual/database"
	"Inventario_Visual/models"
	"os"

	"github.com/gin-gonic/gin"
)

func EliminarImagen(c *gin.Context) {
	id := c.Request.FormValue("id")

	db := database.GetDB()
	var ImagenEliminar models.Imagen

	os.Remove(ImagenEliminar.Ruta)
	db.Where("id = " + id).Delete(&ImagenEliminar)

	c.JSON(200, gin.H{
		"success": true,
	})
}
