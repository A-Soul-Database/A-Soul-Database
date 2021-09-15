package main

import (
	"fmt"
	"os"
	"os/exec"
)

func Updater(lastUpdate string) bool {

	//更新数据
	downUrl := "https://github.com/peterpei1186861238/A-Soul-Database.git"
	//Download Main Archive
	test := "git clone " + downUrl + " " + MonitorSetting.targetPath + "tmp"
	cmd := exec.Command(test)
	if err := cmd.Run(); err != nil {
		fmt.Print("", err)
	}
	//更新文件
	Ioerr := os.Rename(MonitorSetting.targetPath+"tmp/db", MonitorSetting.targetPath)
	if Ioerr != nil {
		fmt.Print("\nerror in move file to working direct")
		return false
	}
	MonitorSetting.update = lastUpdate
	return true
}
