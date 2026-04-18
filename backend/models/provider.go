package models

import "gorm.io/gorm"

type Provider struct {
	gorm.Model
	Serial   string  `json:"serial"`
	Brand    string  `json:"brand"`
	Models   string  `json:"models"`
	Color    string  `json:"color"`
	AssetsID uint    `json:"assets_id"`
	Assets   []Asset `json:"assets"`
}
