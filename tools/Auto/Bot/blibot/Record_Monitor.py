"""
感谢所有对asdb做出贡献的一个魂
看看录播是否更新吧！
https://api.bilibili.com/x/space/arc/search?mid={uid}
"""
import requests
import time
class Bot:

    headers = {
        'User-Agent':"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/93.0",
        'References':'https://www.bilibili.com/',
    }

    def __init__(self,uid:str="393396916",intervel:int=10) -> None:
        self.uid = uid
        self.intervel = intervel
        self.Monitor()

    def Monitor(self):
        url = "https://api.bilibili.com/x/space/arc/search?mid={uid}".format(uid=self.uid)
        latest_Bv = ""
        latest_title = ""
        while True:
            r = requests.get(url,headers=self.headers)
            if latest_Bv == "" or latest_title == "":
                latest_Bv = r.json()["data"]["list"]["vlist"][0]["bvid"]
                latest_title = r.json()["data"]["list"]["vlist"][0]["title"]
            else:
                if r.json()["data"]["list"]["vlist"][0]["bvid"] != latest_Bv:
                    latest_Bv = r.json()["data"]["list"]["vlist"][0]["bvid"]
                    latest_title = r.json()["data"]["list"]["vlist"][0]["title"]
                    if "直播录像" in latest_title:
                        print("录播更新了 {title}".format(title=latest_title))
            time.sleep(self.intervel)

if __name__ == "__main__":
    Bot()