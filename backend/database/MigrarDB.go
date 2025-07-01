package database

import (
	"Inventario_Visual/models"

	"gorm.io/gorm"
)

func MigrarDB(db *gorm.DB) {
	db.AutoMigrate(&models.Imagen{})
	db.AutoMigrate(&models.User{})
}
