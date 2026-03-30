package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	DNI       int
	Firstname string
	Lastname  string
	Password  string
	AreaID    uint
	Area      Area
}
