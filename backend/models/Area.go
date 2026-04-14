package models

import "gorm.io/gorm"

type Area struct {
	gorm.Model
	Name        string
	Description string
	UserID      uint    `json:"user_id"`
	Users       []User  `json:"users"`
	AssetsID    uint    `json:"assets_id"`
	Assets      []Asset `json:"assets"`
}
