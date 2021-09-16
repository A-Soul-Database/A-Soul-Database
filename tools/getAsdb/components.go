package main

import "fmt"

//一些都需要用到的函数
func Resulter(ending bool) {
	if ending {
		fmt.Print("exec ok")
	} else {
		fmt.Print("error occured")
	}
}
