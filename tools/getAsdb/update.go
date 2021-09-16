package main

//更新模块
import (
	"fmt"
	"os"
	"os/exec"
)

func Updater(lastUpdate string) bool {
	//更新数据 lastUpdate:手动检查模式下需要，Webhook模式默认为空。 返回True表示更新成功
	downUrl := "https://github.com/" + Setting.targetResp + ".git"
	//Download Main Archive
	cmd := exec.Command("git", "clone", downUrl, Setting.targetPath+"tmp")
	if err := cmd.Run(); err != nil {
		fmt.Print("", err)
		return false
	}
	fmt.Print("Successfully pulled.")
	//移动文件到工作目录
	Ioerr := os.Rename(Setting.targetPath+"tmp/db", Setting.targetPath)
	if Ioerr != nil {
		fmt.Print("\nerror in move file to working direct:")
		return false
	}
	Setting.update = lastUpdate
	return true
}
