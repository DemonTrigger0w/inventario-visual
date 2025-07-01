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

	router.GET("/ObtenerImagen", handlers.ObtenerImagen)
	router.GET("/Register", handlers.HandlerRegistro)
	router.DELETE("/EliminarImagen", handlers.EliminarImagen)
	router.POST("/ActualizarImagen", handlers.ActualizarImagen)
	router.POST("/EnviarImagen", handlers.EnviarImagen)
	router.POST("/Login", handlers.HandlerLogin)

	router.Run()
}
