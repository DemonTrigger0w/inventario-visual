package models

import "gorm.io/gorm"

type Imagen struct {
	gorm.Model
	Nombre string
	Ruta   string
	Activo bool
	Estado string
}
