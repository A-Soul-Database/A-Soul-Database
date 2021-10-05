import json
import os ,sys, shutil

class Compile():
    def __init__(self):
        self.GITEEUSERNAME,self.GITEEPASSWORD = sys.argv[1],sys.argv[2]
        self.Compiles()

    def Compiles(self):
        os.system("rm -rf webs/*")
        ####  移除之前编译的web
        compileList = json.loads(open("tools/GithubActions/Compiler/compile.json").read())
        for i in compileList:
            name,url = i[0],i[1]
            with open("make-front-end/public/js") as PubJs:
                content = PubJs.read()
                content = content.replace("MyUrl",url)
                content = content.replace("const urlChoice = 0;","const urlChoice = 3;")
                PubJs.close()
            ###编译
            os.system("cd make-font-end && cnpm run build")
            try:
                shutil.move("./web",f"./webs/{name}")
            finally:
                print(f"{name} compiled is finished ! 🥳")

    def PushToGitHhub(self):
        open()