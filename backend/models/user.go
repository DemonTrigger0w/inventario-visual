package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	DNI       int
	Firstname string
	Lastname  string
	Password  string
	Area      Area `json:"area" gorm:"foreignKey:AreaID"`
	AreaID    uint `json:"area_id"`
}
