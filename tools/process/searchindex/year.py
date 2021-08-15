import json,shutil,os
out = {}
temp = {}
month = ["01","02","03","04","05","06","07","08"]
for i in month:
    #print(os.getcwd()+"\\"+i+"\\searchindex.py")
    #shutil.copyfile(os.getcwd()+"\\searchindex.py", os.getcwd()+"\\"+i+"\\searchindex.py")
    #os.system("py "+os.getcwd()+"\\"+i+"\\searchindex.py")
    #os.system("cd "+i)
    #os.system("py searchindex.py")
    os.remove(os.getcwd()+"\\"+i+"\\searchindex.py")
    with open(i+"/search.json","r",encoding="utf-8")as f:
        temp = json.loads(f.read())
        f.close()
    out = {**out,**temp}

with open("search.json","w",encoding="utf-8") as f:
    f.write(str(out).replace("'",'"'))
    f.close()