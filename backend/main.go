package main

import (
	"Inventario_Visual/database"
	"Inventario_Visual/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// AGREGAR UNA ESTRUCTURA PARA USUARIOS (QUE PERMITA HACER LOGIN)

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

	router.Run()
}
