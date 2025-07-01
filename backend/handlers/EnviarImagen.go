package handlers

import (
	"Inventario_Visual/database"
	"Inventario_Visual/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func EnviarImagen(c *gin.Context) {
	idUser := c.Request.FormValue("userId")
	tipoElemento := c.Request.FormValue("elemento")
	img, err := c.FormFile("img")

	if err != nil {
		c.JSON(400, gin.H{
			"error": "Ha ocurrido un error obteniendo la imagen",
		})
		return
	}

	id, err := strconv.Atoi(idUser)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Ha ocurrido un error obteniendo el ID del usuario",
		})
		return
	}

	uploadDir := "./uploads/" + img.Filename
	err = c.SaveUploadedFile(img, uploadDir)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Error al guardar la imagen: " + err.Error(),
		})
		return
	}

	image := models.Imagen{
		IdUser:       id,
		Nombre:       img.Filename,
		Ruta:         uploadDir,
		TipoElemento: tipoElemento,
	}

	db := database.GetDB()
	db.Create(&image)

	c.JSON(201, gin.H{
		"success": true,
	})
}
