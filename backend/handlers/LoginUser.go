package handlers

import (
	"Inventario_Visual/database"
	"Inventario_Visual/models"

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
		return
	}

	var User models.User
	db := database.GetDB()

	err = db.Where("DNI = ?", req.DNI).First(&User).Error
	if err != nil {
		c.JSON(400, gin.H{
			"error": "usuario no encontrado",
		})
		return
	}

	if CheckPasswordHash(req.Password, User.Password) != true {
		c.JSON(400, gin.H{"error": "Contraseña incorrecta"})
		return
	}

	tokenstring, err := Generatetoken(req.DNI)
	if err != nil {
		c.JSON(500, gin.H{
			"error": "error al generar el token",
		})
		return
	}

	c.JSON(200, gin.H{"success": "Usuario logeado exitosamente", "token": tokenstring})
}
