import json,re
out = {}
item = {}
with open("./main.json","r",encoding="utf-8")as f:
    main = json.loads(f.read())
    f.close()

for i in main:
    bv = i["bv"]
    clip = int(i["clip"])
    srt =""
    print(bv,clip)
    if clip==1:
        with open("srt/"+bv+".srt","r",encoding="utf-8")as f:
            srt = f.read()
            f.close()
    else:
        for n in range(clip):
            with open("srt/"+bv+"-"+str(n+1)+".srt","r",encoding="UTF-8") as f:
                srt+=f.read()
                f.close()

    title = i["title"]
    tags = ""
    for j in i["tags"]:
        tags = tags + "," + j
    activity = ""
    for k in range(3):
        for a in i["items"][k]["item"]:
            activity = activity+","+a[0]

    srt.replace("'","")
    srt.replace('"',"")
    srt = re.sub("((?=[\x21-\x7e]+)[^A-Za-z0-9])","",srt)
    srt = re.sub(r"\n","",srt)
    srt = re.sub("[0-9]","",srt)
    item = {
        "title":title,
        "type":activity[1:],
        "tags":tags[1:],
        "srt":srt
    }
    out.update({bv:item})
    #字幕替换
with open("./search.json","w",encoding="utf-8") as f:
    f.write(str(out).replace("'",'"'))
    f.close()