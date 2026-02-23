package handlers

import (
	"Inventario_Visual/database"
	"Inventario_Visual/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func Register(c *gin.Context) {
	db := database.GetDB()
	Usuario := c.Request.FormValue("usuario")
	contraseña := c.Request.FormValue("contraseña")

	ContraseñaInt, err := strconv.Atoi(contraseña)
	if err != nil {
		c.JSON(400, gin.H{"error": "Contraseña debe ser un número"})
		return
	}

	usuarioDB := models.User{
		Username: Usuario,
		Password: ContraseñaInt,
	}

	db.Create(usuarioDB)

}
