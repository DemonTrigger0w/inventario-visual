package main

import (
	"Inventario_Visual/database"
	"Inventario_Visual/handlers"

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
	router.GET("/ObtenerActivos", handlers.ObtenerActivos)
	router.DELETE("/EliminarAsset", handlers.EliminarAsset)
	router.DELETE("/EliminarImagen", handlers.EliminarImagen)
	router.POST("/EnviarImagen", handlers.EnviarImagen)
	router.POST("/RegistrarUsuario", handlers.RegisterUser)
	router.POST("/Iniciarsesion", handlers.LoginUser)
	router.POST("/Guardarinventario", handlers.Guardarinventario)

	router.Run()

}
