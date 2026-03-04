package models

import "gorm.io/gorm"

type Asset struct {
	gorm.Model
	Description string
	Status      uint
	Providers   uint
	Image       string
	Areas       uint
}
