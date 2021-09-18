package main

//手动更新模式 未完成

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"
)

func Mannual() {

	//设置项目信息
	var lastUpdate string
	for {
		lastUpdate = monitor()
		if lastUpdate != Setting.Update {
			fmt.Print("last update at " + lastUpdate + "\n")
			Updater(lastUpdate)
		}
		time.Sleep(time.Duration(Setting.CheckInterval) * time.Second)
		//设置定时器
	}
}

func monitor() string {
	fmt.Print("Trying to ask for update\n")
	resp, err := http.Get("https://api.github.com/repos/" + Setting.TargetRepo)
	if err != nil {
		fmt.Print(err)
		return "err"
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Print("IO error\n", err)
		return "err"
	}
	if resp.StatusCode == 200 {
		fmt.Print("Links Ok\n")
	}

	type api struct {
		LastUpdate string `json:"updated_at"`
	}
	var apis api
	json.Unmarshal(body, &apis)
	return apis.LastUpdate
}
