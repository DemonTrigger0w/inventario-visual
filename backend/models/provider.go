package models

import "gorm.io/gorm"

type Provider struct {
	gorm.Model
	Serial   string  `json:"Serial"`
	Brand    string  `json:"Brand"`
	Models   string  `json:"Models"`
	Color    string  `json:"Color"`
	AssetsID uint    `json:"assets_id"`
	Assets   []Asset `json:"assets"`
}
