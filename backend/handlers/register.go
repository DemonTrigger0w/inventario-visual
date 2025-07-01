package handlers

import (
	"Inventario_Visual/database"
	"Inventario_Visual/models"
	"Inventario_Visual/utils"
	"fmt"

	"github.com/gin-gonic/gin"
)

func Register(nuevousuario models.User) bool {
	db := database.GetDB()
	var check models.User
	db.Find(&check, "cedula = ?", nuevousuario.Cedula)

	fmt.Println(check)

	if check.Cedula == nuevousuario.Cedula {
		return false
	}

	nuevousuario.Clave = utils.EncriptarClave(nuevousuario.Clave)
	db.Create(&nuevousuario)

	return true
}


func HandlerRegistro(c *gin.Context) {
	var User models.User
	c.ShouldBindJSON(&User)
	exito := Register(User)

	if exito {
		c.JSON(201, gin.H{
			"success": true,
		})
		return
	} else {
		c.JSON(401, gin.H{
			"error": "El estudiante ya existe",
		})
		return
	}
}