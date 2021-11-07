"""
是否在直播呢
https://api.bilibili.com/x/space/acc/info?mid={uid}&jsonp=jsonp
"""
import sys
import requests
import time
class Bot:
    
    result = {
        "onLive":False,
        "start_time":"",
        "end_time":"",
        "title":"",
    }

    headers = {
        'User-Agent':"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/93.0",
        'References':'https://www.bilibili.com/',
    }

    def __init__(self,uid,intervel:int=10) -> None:
        self.uid = []
        self.intervel = intervel
        if type(uid) == str:
            self.uid.append(uid)
        elif type(uid) == list:
            self.uid = uid
        elif type(uid) == int:
            self.uid.append(str(uid))
        else:
            sys.exit("uid type error")

    def get_live_status(self):
        while True:
            for uid in self.uid:
                url = "https://api.bilibili.com/x/space/acc/info?mid={uid}&jsonp=jsonp".format(uid=uid)
                r = requests.get(url,headers=self.headers)
                if r.json()["data"]["live_room"]["liveStatus"] == 1:
                    print("\r{uid} is on streaming with title {status}".format(uid=uid,status=r.json()['data']["live_room"]["title"]),end="")
                    self.result["onLive"] = True
                    if len(self.result["start_time"]) == 0:
                        self.result["start_time"] = time.strftime("%Y-%m-%d %H:%M:%S",time.localtime())
                        self.result["title"] = r.json()['data']["live_room"]["title"]
                else:
                    print("\r{uid} is not on streaming".format(uid=uid),end="")
                    if self.result["onLive"]:
                        self.result["end_time"] = time.strftime("%Y-%m-%d %H:%M:%S",time.localtime())
                        print("LiveStream end with result ",self.result)
                        self.result["onLive"] = False
                        #直播结束
            time.sleep(self.intervel)

if __name__ == "__main__":
    a = Bot("672328094")
    a.get_live_status()