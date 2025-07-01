package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Nombre string
	Clave string
	Cedula int
}