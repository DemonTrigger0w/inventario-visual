package models

import "gorm.io/gorm"

type Asset struct {
	gorm.Model
	Description string
	Status      int
	provider_ID int
	Image       string
	Area_ID     int
}
