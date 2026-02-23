package handlers

import (
	"Inventario_Visual/database"
	"Inventario_Visual/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func CrearUsuario(c *gin.Context) {
	db := database.GetDB()
	usuario := c.Request.FormValue("usuario")
	contraseña := c.Request.FormValue("contraseña")

	password, err := strconv.Atoi(contraseña)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "contraseña invalida",
		})
	}

	user := models.User{
		Username: usuario,
		Password: password,
	}

	db.Create(user)
}
