package main

/*
	用于更新数据文件
	Done:
		Git Pull 并复制文件到目标目录
	ToDo:
		Web 和 Tools的更新
		文件锁
*/
import (
	"log"
	"os"
	"os/exec"

	"github.com/otiai10/copy"
)

func Updater(lastUpdate string) bool {
	/*
		更新数据
			lastUpdate:手动检查模式下需要，Webhook模式默认为空。
			返回True表示更新成功
	*/

	downUrl := "https://github.com/" + Setting.TargetRepo + ".git"
	//Download Main Archive
	cmd := exec.Command("git", "clone", downUrl, Setting.TargetPath+"tmp")
	if err := cmd.Run(); err != nil {
		log.Print("Cannot access to Github:  ", err)
		return false
	}

	log.Print("Successfully pulled.")
	//复制文件到工作目录。即使是在IDE里面读，Go 也会默认文件被占用。替换时建议不占用db文件数据，不然我不好手，可能会报Access Denied吧。
	if r := Cop(Setting.DiffList); !r {
		return false
	}
	//删除其余的文件
	os.RemoveAll(Setting.TargetPath + "tmp/")
	//更新版本信息
	Setting.Update = lastUpdate
	return true
}
func Cop(typ []string) bool {
	/*
		文件复制
		请再三确认文件目录
		使用 github.com/otiai10/copy
		typ: 输入的替换文件列表 ["db","tools","web"]
		返回True即为成功
	*/

	for k := range typ {
		if typ[k] == "db" {
			Ioerr := copy.Copy(Setting.TargetPath+"tmp/db/", Setting.TargetPath+"db")
			if Ioerr != nil {
				log.Print("\nerror in move file to working direct:", Ioerr)
				return false
			}
			if len(Setting.AfterTriggers.AfterTriggerDb) > 0 {
				cmd := exec.Command(Setting.AfterTriggers.AfterTriggerDb)
				if err := cmd.Run(); err != nil {
					log.Print("error in excuting afterdb", err)
					return false
				}
			}
		}
		if typ[k] == "tools" {
			Ioerr := copy.Copy(Setting.TargetPath+"tmp/tools/", Setting.TargetPath+"tools")
			if Ioerr != nil {
				log.Print("\nerror in move file to working direct:", Ioerr)
				return false
			}
			if len(Setting.AfterTriggers.AfterTriggerTools) > 0 {
				cmd := exec.Command(Setting.AfterTriggers.AfterTriggerTools)
				if err := cmd.Run(); err != nil {
					log.Print("error in excuting aftertools", err)
					return false
				}
			}
		}
		if typ[k] == "web" {
			Ioerr := copy.Copy(Setting.TargetPath+"tmp/web/", Setting.TargetPath+"web")
			if Ioerr != nil {
				log.Print("\nerror in move file to working direct:", Ioerr)
				return false
			}
			if len(Setting.AfterTriggers.AfterTriggerWeb) > 0 {
				cmd := exec.Command(Setting.AfterTriggers.AfterTriggerWeb)
				if err := cmd.Run(); err != nil {
					log.Print("error in excuting afterWeb", err)
					return false
				}
			}
		}
	}
	return true
}
