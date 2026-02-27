package models

import "gorm.io/gorm"

type Provider struct {
	gorm.Model
	Serial string
	Brane  string
	Color  string
}
