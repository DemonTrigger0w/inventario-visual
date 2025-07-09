package handlers

import (
	"Inventario_Visual/database"
	"Inventario_Visual/models"

	"github.com/gin-gonic/gin"
)

func EnviarImagen(c *gin.Context) {
	nombre := c.Request.FormValue("nombre")
	estado := c.Request.FormValue("estado")
	activoString := c.Request.FormValue("activo")

	activo := activoString == "true"

	img, err := c.FormFile("img")
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Ha ocurrido un error obteniendo la imagen",
		})
		return
	}

	uploadir := "/uploads/" + img.Filename

	c.SaveUploadedFile(img, "."+uploadir)

	image := models.Imagen{
		Nombre: nombre,
		Ruta:   uploadir,
		Activo: activo,
		Estado: estado,
	}

	db := database.GetDB()
	db.Create(&image)

	c.JSON(201, gin.H{
		"success": true,
	})
}
