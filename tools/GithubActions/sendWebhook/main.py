import requests,os,json,time,sys

HOME = os.getenv("HOME")

def main():
    with open(HOME+"/files.json") as f:
        allChanges = json.loads(f.read())
        f.close()


    result = {
        "time":time.time(),
        "db":False,
        "web":False,
        "tools":False
    }
    
    for i in allChanges:
        if i.split("/")[0] == "tools":
            result["tools"] = True
        if i.split("/")[0] == "db":
            result["db"] = True
        if i.split("/")[0] == "make-front-end":
            result["web"] = True
            os.environ["WebUpdate"] = "1"
    with open("tools/sendWebhook/sendList.txt","r",encoding="utf-8")as f:
        urlList = f.read().split("\n")
        f.close()
    for i in urlList:
        try:
            print("trying to POST info to",i)
            r = requests.post(i,json=result)
            print("POST with result to "+ i + "with returning " + r.status_code)
        finally:
            sys.exit()
main()
