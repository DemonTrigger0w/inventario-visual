package handlers

import (
	"Inventario_Visual/database"
	"Inventario_Visual/models"
	"Inventario_Visual/utils"
	"fmt"

	"github.com/gin-gonic/gin"
)

func LoginUser(c *gin.Context) {
	type Login struct {
		DNI      string `json:"dni"`
		Password string `json:"password"`
	}

	var req Login

	err := c.ShouldBindJSON(&req)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "error al obtener la informacion",
		})
	}

	if req.DNI == "" || req.Password == "" {
		c.JSON(400, gin.H{"error": "Faltan datos"})
		fmt.Println(req.DNI)
		fmt.Println(req.Password)
		return
	}

	var User models.User

	db := database.GetDB()

	err = db.Where("DNI = ?", req.DNI).First(&User).Error
	if err != nil {
		c.JSON(400, gin.H{
			"error": "usuario no encontrado",
		})
	}

	if utils.CheckPasswordHash(req.Password, User.Password) != true {
		c.JSON(401, gin.H{"error": "Contraseña incorrecta"})
		return
	}

	c.JSON(200, gin.H{"success": "Usuario logeado exitosamente"})
}
