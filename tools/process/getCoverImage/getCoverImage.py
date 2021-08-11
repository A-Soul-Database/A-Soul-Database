import requests,json,time,sys
mode =0
try:
    if len(sys.argv[1]):
        bv = sys.argv[1]
        mode = 1
except:
    pass
result = {}
def getImg(bv):
    hear = {
        "Accept":"*/*",
        "Accept-Encoding":"gzip, deflate, br",
        "Accept-Language":"zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0"
    }
    r = requests.get("https://www.bilibili.com/video/"+bv,headers=hear)
    time.sleep(1)
    try:
        res = r.text.split('<meta data-vue-meta="true" property="og:image" content="')[1].split('"')[0]
    except:
        res = "None"
        print("stoped at ",bv)
    print("bv %s , img url is : %s" ,bv, res)
    return res


with open("main.json","r",encoding="utf-8")as f:
    main = json.loads(f.read())
    f.close()
if mode:
    for n in range(len(main)):
        print(n)
        if main[n]["bv"] == bv:
            break
        else:
            main.pop(n)

for i in main:
    ress = getImg(i["bv"])
    if ress =="None":
        with open("Cover.json","w",encoding="utf-8")as f:
            f.write(str(result))
            f.close()
        sys.exit()
    else:
        result[i["bv"]] = ress
with open("Cover.json","w",encoding="utf-8")as f:
    f.write(str(result).replace("'",'"'))
    f.close()