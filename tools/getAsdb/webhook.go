package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type WebhookStruct struct {
	Time  int  `json:"time"`
	Db    bool `json:"db"`
	Web   bool `json:"web"`
	Tools bool `json:"tools"`
}

func Webhooks() {
	router := gin.Default()
	router.POST("/", HookMe)
	router.Run("127.0.0.1:8988")

}
func HookMe(c *gin.Context) {
	var thisMesg WebhookStruct
	for k, v := range c.Request.Header {
		fmt.Print(k, v)
	}
	c.IndentedJSON(http.StatusOK, "{'error':'0'}")
	if err := c.BindJSON(&thisMesg); err != nil {
		fmt.Print(err)
	}
	Updater("")
}
