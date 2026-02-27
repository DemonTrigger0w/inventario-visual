package database

import (
	"Inventario_Visual/models"

	"gorm.io/gorm"
)

func MigrarDB(db *gorm.DB) {
	db.AutoMigrate(&models.Imagen{})
	db.AutoMigrate(&models.User{})
	db.AutoMigrate(&models.Status{})
	db.AutoMigrate(&models.Area{})
	db.AutoMigrate(&models.Provider{})
	db.AutoMigrate(&models.Asset{})

}
