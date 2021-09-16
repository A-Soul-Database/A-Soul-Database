package main

var MannualMod bool

type settings struct {
	//上次更新时间
	update string
	//检查间隔
	checkInterval int
	//项目仓库
	targetResp string
	//目标路径
	targetPath string
	//轮询模式/Webhook模式
	mannualMod bool
	//替换模式 string[] db make-font-end tools
	diffList []string
}

var Setting settings

func main() {
	Setting.update = ""
	Setting.checkInterval = 200
	Setting.targetResp = "peterpei1186861238/A-Soul-Database"
	Setting.targetPath = "./"
	Setting.diffList = ["db"]
	Setting.mannualMod = false
	if !MannualMod {
		//Webhooks()
		Updater("")
	} else {
		Mannual()
	}
}
