package models

import "gorm.io/gorm"

type Status struct {
	gorm.Model
	Name     string
	AssetsID uint    `json:"assets_id"`
	Assets   []Asset `json:"assets"`
}
