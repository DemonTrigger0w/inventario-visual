package handlers

import (
	"Inventario_Visual/database"
	"Inventario_Visual/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func RegisterUser(c *gin.Context) {
	db := database.GetDB()
	type UserRegister struct {
		DNI       string `json:"dni"`
		Firstname string `json:"firstname"`
		Lastname  string `json:"lastname"`
		Password  string `json:"password"`
		Area      string `json:"area"`
	}

	var data UserRegister

	err := c.ShouldBindJSON(&data)
	if err != nil {
		c.JSON(400, gin.H{"error": "error al obtener la informacion"})
		return
	}

	DNI_int, err := strconv.Atoi(data.DNI)
	if err != nil {
		c.JSON(400, gin.H{"error": "error al obtener el DNI"})
		return
	}

	password_hash, err := HashPassword(data.Password)
	if err != nil {
		c.JSON(400, gin.H{"error": "Error al encriptar la contraseña"})
		return
	}

	asset := models.User{
		DNI:       DNI_int,
		Firstname: data.Firstname,
		Lastname:  data.Lastname,
		Password:  password_hash,

		Area: models.Area{
			Name: data.Area,
		},
	}

	db.Create(&asset)

	c.JSON(200, gin.H{"success": "usuario registrado exitosamente"})
}
