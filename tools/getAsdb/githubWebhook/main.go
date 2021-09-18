package main

/*
	Get Asdb
	优雅 迅速 便捷

	Asoul每周多播，更新asdb的数据库并不方便，故提供该包便于外链使用。

	提供两种方法
		1.有公网ip 可以注册 Webhook 每当repo有新的更新时，Github Actions会向你的服务器POST一个请求。
			需要注意的是，我们并没有使用Github自带的Webhook，因为其仓库最多仅能绑定20个域名。安全性还在设计中
		2.通过GithubApi轮询。

	使用:
		1.请认真配置Setting的相关参数，尤其是 Settings.targetPath
*/
import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
)

//手动模式
var MannualMod bool

//更新trigger
var UpdateTrigger bool

type settings struct {
	//上次更新时间
	Update string `json:"update"`
	//检查间隔
	CheckInterval int `json:"checkInterval"`
	//项目仓库
	TargetRepo string `json:"targetRepo"`
	//目标路径 注意,请位于 db 文件夹同一层级
	TargetPath string `json:"targetPath"`
	//轮询模式/Webhook模式
	MannualMod bool `json:"mannualMod"`
	//替换模式 string[] db web tools
	DiffList []string `json:"diffList"`
	//Gin监听地址
	ListenAddr string `json:"listenAddr"`
}

var Setting settings

func main() {
	//读取Config.json 文件以配置
	jsonFile, err := os.Open("config.json")
	if err != nil {
		log.Fatal("Cannot read config.json!")
	}
	defer jsonFile.Close()
	byteVal, _ := ioutil.ReadAll(jsonFile)
	json.Unmarshal(byteVal, &Setting)

	//设置log输出
	logFile, err := os.OpenFile("./logger.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
	if err != nil {
		fmt.Print(err)
	}
	log.SetOutput(logFile)
	log.SetFlags(log.Llongfile | log.Lmicroseconds | log.Ldate)

	if !MannualMod {
		Webhooks()
	}
}
