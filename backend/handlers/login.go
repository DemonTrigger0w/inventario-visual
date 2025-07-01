package handlers

import (
	"Inventario_Visual/database"
	"Inventario_Visual/models"
	"Inventario_Visual/utils"

	"github.com/gin-gonic/gin"
)

func Login(cedula int, clave string) bool {
	db := database.GetDB()
	var User models.User
	db.Where("cedula = ?", cedula).First(&User)
	checkClave := utils.CompararClave(clave, User.Clave)

	if !checkClave {
		return false
	}

	if User.Cedula != cedula {
		return false
	}
	return true
}

func HandlerLogin(c *gin.Context) {
	var User models.User
	err := c.ShouldBindJSON(&User)
	if err != nil {
		return
	}
	exito := Login(User.Cedula, User.Clave)
	c.JSON(200, gin.H{
		"success": exito,
	})
}
