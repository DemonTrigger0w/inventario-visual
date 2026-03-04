package database

import (
	"Inventario_Visual/models"

	"gorm.io/gorm"
)

func MigrarDB(db *gorm.DB) {
	err := db.AutoMigrate(
		&models.Asset{},
		&models.Area{},
		&models.Status{},
		&models.Provider{},
		&models.User{},
		&models.Imagen{},
	)

	if err != nil {
		panic("Ha ocurrido un error al migrar la base de datos")
	}

}
