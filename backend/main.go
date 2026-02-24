package main

import (
	"Inventario_Visual/database"
	"Inventario_Visual/handlers"

	// "Inventario_Visual/utils"
	// "fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db := database.GetDB()
	database.MigrarDB(db)

	router := gin.Default()
	config := cors.DefaultConfig()
	router.Use(cors.Default())
	config.AllowAllOrigins = true

	router.Static("/uploads", "./uploads")
	router.GET("/ObtenerImagenes", handlers.ObtenerImagenes)
	router.DELETE("/EliminarImagen", handlers.EliminarImagen)
	router.POST("/EnviarImagen", handlers.EnviarImagen)
	router.POST("/RegistrarUsuario", handlers.RegisterUser)
	router.POST("/Iniciarsesion", handlers.LoginUser)

	router.Run()
}

/*
func main() {
	password := "miclavesegura1234!"

	hash, err := utils.HashPassword(password)
	if err != nil {
		fmt.Println("ocurrio un error en la encriptacion de la clave:", err)
	}
	fmt.Println("hash generado:", hash)

	compararar_clave := utils.CheckPasswordHash(password, hash)
	fmt.Println("comparar clave:", compararar_clave)
}
*/
