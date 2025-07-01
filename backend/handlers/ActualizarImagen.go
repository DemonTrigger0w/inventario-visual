package handlers

import (
	"Inventario_Visual/database"
	"Inventario_Visual/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func ActualizarImagen(c *gin.Context) {
	tipoelemento := c.Request.FormValue("elemento")
	iduser := c.Request.FormValue("userid")
	img, err := c.FormFile("img")

	if err != nil {
		c.JSON(400, gin.H{
			"error": "Ha ocurrido un error obteniendo la imagen",
		})
		return
	}

	id, err := strconv.Atoi(iduser)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "error al obtener el id",
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

	db := database.GetDB()
	Img := models.Imagen{
		IdUser:       id,
		Nombre:       img.Filename,
		Ruta:         uploadDir,
		TipoElemento: tipoelemento,
	}

	db.Updates(&Img)

	c.JSON(400, gin.H{
		"success": true,
	})
	return
}
