package main

var MannualMod bool

type settings struct {
	update string
	//上次更新时间
	checkInterval int
	//检查间隔
	MonitorUrlApi string
	//项目链接
	targetPath string
	//目标路径
	dbOnly bool
	//若为True,仅对比db差异，不对比其他内容
}

var MonitorSetting settings

func main() {
	MonitorSetting.update = ""
	MonitorSetting.checkInterval = 200
	MonitorSetting.MonitorUrlApi = "https://api.github.com/repos/peterpei1186861238/A-Soul-Database"
	MonitorSetting.targetPath = "./"
	MonitorSetting.dbOnly = true
	MannualMod = false
	if !MannualMod {
		//Webhooks()
		Updater("")
	} else {
		Mannual()
	}
}
