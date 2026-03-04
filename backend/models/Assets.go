package models

import "gorm.io/gorm"

type Asset struct {
	gorm.Model
	Name        string
	Image       string
	Description string
	AreaID      uint
	StatusID    uint
	ProviderID  uint
}
