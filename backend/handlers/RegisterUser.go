package handlers

import (
	"Inventario_Visual/database"
	"Inventario_Visual/models"
	"Inventario_Visual/utils"
	"strconv"

	"github.com/gin-gonic/gin"
)

func RegisterUser(c *gin.Context) {
	db := database.GetDB()
	DNI := c.Request.FormValue("DNI")
	Firstname := c.Request.FormValue("firstname")
	Lastname := c.Request.FormValue("lastname")
	contraseña := c.Request.FormValue("password")
	Area := c.Request.FormValue("area")

	DNI_int, err := strconv.Atoi(DNI)
	if err != nil {
		c.JSON(400, gin.H{"error": "error al obtener el DNI"})
		return
	}

	area_int, err := strconv.Atoi(Area)
	if err != nil {
		c.JSON(400, gin.H{"error": "Error al obtener el area "})
		return
	}

	password_hash, err := utils.HashPassword(contraseña)
	if err != nil {
		c.JSON(400, gin.H{"error": "Error al encriptar la contraseña"})
		return
	}

	User := models.User{
		DNI:       DNI_int,
		Firstname: Firstname,
		Lastname:  Lastname,
		Password:  password_hash,
		Area_ID:   area_int,
	}

	c.JSON(200, gin.H{"success": "usuario registrado exitosamente"})

	db.Create(&User)
}
