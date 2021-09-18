package main

/*
	Webhook时调用该文件下的函数
		请注意端口绑定，自行配置nginx、apache反代
*/
import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func Webhooks() {
	router := gin.Default()
	router.POST("/", githubHook)
	router.Run(Setting.ListenAddr)

}

func githubHook(c *gin.Context) {
	/*Verify For Github Official Hook*/
	log.Print("Request Received")
	//Get Sha256 And Verify

	signature := c.GetHeader("X-Hub-Signature-256")
	body, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		log.Print("Can not get sha256")
		return
	}
	mac := hmac.New(sha256.New, []byte(os.Getenv("GithubToken")))
	mac.Write([]byte(body))
	expectedMac := mac.Sum(nil)
	results := "sha256="+hex.EncodeToString(expectedMac) == signature
	if results {
		c.AbortWithStatus(http.StatusOK)
		go callUpdater()
	} else {
		c.AbortWithStatus(http.StatusInternalServerError)
		log.Print("Sha256 Dismatch!")
		return
	}
}
func callUpdater() { Updater("") }
