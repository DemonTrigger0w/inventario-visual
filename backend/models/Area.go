package models

import "gorm.io/gorm"

type Area struct {
	gorm.Model
	Name        string  `json:"name"`
	Description string  `json:"description"`
	UserID      uint    `json:"user_id"`
	Users       []User  `json:"users"`
	AssetsID    uint    `json:"assets_id"`
	Assets      []Asset `json:"assets"`
}
