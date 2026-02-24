package handlers

import (
	"Inventario_Visual/database"
	"Inventario_Visual/models"
	"Inventario_Visual/utils"

	"github.com/gin-gonic/gin"
)

func LoginUser(c *gin.Context) {
	db := database.GetDB()
	Usuario := c.Request.FormValue("usuario")
	Contraseña := c.Request.FormValue("contraseña")

	var user models.User
	db.Where("username = ?", Usuario).First(&user)

	if user.ID == 0 {
		c.JSON(400, gin.H{"error": "Usuario no encontrado"})
		return
	}

	PasswordVerification := utils.CheckPasswordHash(Contraseña, user.Password)
	if PasswordVerification != true {
		c.JSON(400, gin.H{
			"error": "contraseña invalida",
		})
	}

	c.JSON(200, gin.H{"success": "Usuario logeado exitosamente"})
}
