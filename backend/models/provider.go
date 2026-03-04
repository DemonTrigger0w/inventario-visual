package models

import "gorm.io/gorm"

type Provider struct {
	gorm.Model
	Serial string
	Brand  string
	Models string
	Color  string
	Assets []Asset
}
