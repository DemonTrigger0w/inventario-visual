package models

import "gorm.io/gorm"

type Area struct {
	gorm.Model
	Name        string
	Description string
	Users       []User
	Assets      []Asset
}
