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
	"flag"
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
	LoggerPath string `json:"logger_path"`
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
	//是否为GIthubWebhook
	GithubOfficialWebhook bool `json:"isGithubOfficial"`
	//收到更新命令后执行触发器(例如要编译自己的web或其他内容) 举例: python3 main.py 或 cnpm build等
	AfterTriggers triggers
}
type triggers struct {
	AfterTriggerDb    string `json:"db"`
	AfterTriggerWeb   string `json:"web"`
	AfterTriggerTools string `json:"tools"`
}

var Setting settings

var configFile = flag.String("f", "./utils/config.json", "set config file loading.")

func main() {
	if _settings, err := readConfig(*configFile); err != nil {
		log.Fatal(err)
	} else {
		Setting = *_settings
		fmt.Printf("use config file -> %s\n", *configFile)
	}

	if Setting.LoggerPath != "" {
		//设置log输出
		logFile, err := os.OpenFile(Setting.LoggerPath, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
		if err != nil {
			fmt.Print(err)
		}
		log.SetOutput(logFile)
		log.SetFlags(log.Llongfile | log.Lmicroseconds | log.Ldate)
	}

	if !MannualMod {
		Webhooks()
	} else {
		Mannual()
	}
}

func readConfig(configPath string) (*settings, error) {
	var _settings *settings
	//读取Config.json 文件以配置
	jsonFile, err := os.Open(configPath)
	if err != nil {
		return nil, err
	}
	defer jsonFile.Close()

	byteVal, err := ioutil.ReadAll(jsonFile)
	if err != nil {
		return nil, err
	}

	if err = json.Unmarshal(byteVal, &_settings); err != nil {
		return nil, err
	}

	return _settings, nil
}
