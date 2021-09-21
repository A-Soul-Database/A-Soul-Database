package main

/*
	Webhook时调用该文件下的函数
		请注意端口绑定，自行配置nginx、apache反代
		Webhooks() =>该文件的主入口，唯一的大写开头
		actionswebHook() => GithubActions调用的Webhook
			isFromGithub() => 检查请求Ip是否来自于GithubActions官方
		githubHook() => Github仓库的Webhook
*/
import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/yl2chen/cidranger"
)

func Webhooks() {
	router := gin.Default()
	if Setting.GithubOfficialWebhook {
		//GitHub 官方的webhook
		router.POST("/", githubHook)
	} else {
		//GitHub actions的第三方webhook
		router.POST("/", actionswebHook)
	}
	router.Run(Setting.ListenAddr)
}

type WebhookStruct struct {
	Time  int  `json:"time"`
	Db    bool `json:"db"`
	Web   bool `json:"web"`
	Tools bool `json:"tools"`
}

func actionswebHook(c *gin.Context) {
	/*Github actions的webhook*/
	if !isFromGithub(c) {
		log.Print("illegal call from", c.ClientIP())
		c.AbortWithStatus(500)
		return
	}
	var webhooks WebhookStruct
	body, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		log.Print("Io read error")
	}
	json.Unmarshal(body, &webhooks)
	//接收并反序列化json文件

	/*对比是否需要更新*/
	for items := range Setting.DiffList {
		if Setting.DiffList[items] == "db" && webhooks.Db {
			go callUpdater()
		} else if Setting.DiffList[items] == "web" && webhooks.Web {
			go callUpdater()
		} else if Setting.DiffList[items] == "tools" && webhooks.Tools {
			go callUpdater()
		}
	}
}

func isFromGithub(c *gin.Context) bool {
	/*限制Github ip,防止第三方POST*/
	fp, err := ioutil.ReadFile("./utils/githubIps")
	if err != nil {
		log.Print("error in open github IPs")
	}
	/*读取GithubActions 白名单。 Refer : https://api.github.com/meta
	IP 采用CIDR 计数
	*/
	whitlelistString := strings.Split(string(fp), ",")
	//分割为每个ip

	//对于127.0.0.1 clientip0 =127 , clientip1=0 ...

	//前两位ip比较

	//请求的前两位IP
	ranger := cidranger.NewPCTrieRanger()
	for k := range whitlelistString {
		_, networks, _ := net.ParseCIDR(whitlelistString[k])
		ranger.Insert(cidranger.NewBasicRangerEntry(*networks))
	}

	contains, err := ranger.Contains(net.ParseIP(c.ClientIP()))
	if err != nil {
		log.Panic(err)
	}

	return contains
}

func githubHook(c *gin.Context) {
	/*Github的webhook*/
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
