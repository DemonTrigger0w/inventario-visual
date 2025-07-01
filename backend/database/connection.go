package database

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func GetDB() *gorm.DB {

	db, err := gorm.Open(sqlite.Open("inventario.db"), &gorm.Config{})
	if err != nil {
		panic("Ha ocurrido un error al entrar a la base de datos")
	}
	return db
}