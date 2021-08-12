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
    indexs = re.sub(r'[0-9]*:[0-9]*:[0-9]*',"",indexs)
    indexs = re.sub(r'[0-9]*：[0-9]*：[0-9]*',"",indexs)
    #三轴
    indexs = re.sub(r'[0-9]*:[0-9]*',"",indexs)
    indexs = re.sub(r'[0-9]*：[0-9]*',"",indexs)
    #二轴
    
    index = indexs.splitlines()
    clearList = ["p1","P1","P2","p2","才八点","晚安","'",'"']
    #常用词过滤
    
    for i in clearList:
        for n in index:
            n.strip()
            if i in n:
                index.remove(n)
            

    #print(index)
    #去除时间轴
    #分块
    for i in main:
        if i["bv"]==bv:
            i["tags"] += index

    
    with open("main.json","w",encoding='utf-8')as f:
        f.write(str(main).replace("'",'"'))
        f.close()