import json,os,re

with open("main.json","r",encoding="utf-8") as f:
    main = f.read()
    f.close()
main = json.loads(main)
filename = os.listdir(os.getcwd()+"/timeline")
for i in filename:
    with open("timeline/"+i,"r",encoding='utf-8') as f:
        indexs = f.read()
        f.close()
    bv = i.split(".")[0]
    indexs = re.sub(r'[0-9]*:[0-9]*',"",indexs)
    indexs = re.sub(r'[0-9]*：[0-9]*',"",indexs)
    indexs.split("\n")
    #去除时间轴
    #分块
    for i in main:
        if i["bv"]==bv:
            i["tags"] += indexs
            print(i["bv"])
    