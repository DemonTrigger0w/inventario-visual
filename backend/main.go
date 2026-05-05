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
	router.POST("/RegistrarUsuario", handlers.RegisterUser)
	router.POST("/Iniciarsesion", handlers.LoginUser)

	protected := router.Group("/")
	protected.Use(handlers.AuthMiddleware())
	{
		protected.GET("/ObtenerImagenes", handlers.ObtenerImagenes)
		protected.GET("/ObtenerActivos", handlers.ObtenerActivos)
		protected.DELETE("/EliminarAsset", handlers.EliminarAsset)
		protected.DELETE("/EliminarImagen", handlers.EliminarImagen)
		protected.POST("/EnviarImagen", handlers.EnviarImagen)
		protected.POST("/Guardarinventario", handlers.Guardarinventario)
	}

	router.Run()
}
