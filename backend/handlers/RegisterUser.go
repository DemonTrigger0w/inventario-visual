package handlers

import (
	"Inventario_Visual/database"
	"Inventario_Visual/models"
	"Inventario_Visual/utils"

	"github.com/gin-gonic/gin"
)

func RegisterUser(c *gin.Context) {
	db := database.GetDB()
	usuario := c.Request.FormValue("usuario")
	contraseña := c.Request.FormValue("contraseña")

	password_hash, err := utils.HashPassword(contraseña)
	if err != nil {
		c.JSON(400, gin.H{"error": "Error al encriptar la contraseña"})
		return
	}

	User := models.User{
		Username: usuario,
		Password: password_hash,
	}

	c.JSON(200, gin.H{"success": "usuario registrado exitosamente"})

	db.Create(&User)
}
