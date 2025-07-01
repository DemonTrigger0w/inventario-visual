package models

import "gorm.io/gorm"

type Imagen struct {
	gorm.Model
	Nombre       string
	Ruta         string
	TipoElemento string
	IdUser       int
}
