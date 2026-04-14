package models

import "gorm.io/gorm"

type Asset struct {
	gorm.Model
	Name        string   `json:"name"`
	Image       string   `json:"image"`
	Description string   `json:"description"`
	AreaID      uint     `json:"area_id"`
	Area        Area     `json:"area" gorm:"foreignKey:AreaID"`
	StatusID    uint     `json:"status_id"`
	Status      Status   `json:"status" gorm:"foreignKey:StatusID"`
	ProviderID  uint     `json:"provider_id"`
	Provider    Provider `json:"provider" gorm:"foreignKey:ProviderID"`
}
