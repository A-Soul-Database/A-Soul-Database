"""
是否在直播呢
https://api.bilibili.com/x/space/acc/info?mid={uid}&jsonp=jsonp
"""
import sys
import requests
import time
from threading import Thread
class Bot:
    


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
        
        for i in uid:
            t = Thread(target=self.get_live_status,args=(i,))
            t.start()

    def get_live_status(self,uid:str):
        result = {
            "onLive":False,
            "uid":"",
            "start_time":"",
            "end_time":"",
            "title":"",
        }
        while True:
            url = "https://api.bilibili.com/x/space/acc/info?mid={uid}&jsonp=jsonp".format(uid=uid)
            r = requests.get(url,headers=self.headers)

            if r.json()["data"]["live_room"]["liveStatus"] == 1:
                print("\r{name} {uid} is on streaming with title {status}".format(uid=uid,status=r.json()['data']["live_room"]["title"],name=r.json()["data"]["name"]),end="")
                result["onLive"] = True
                if len(result["start_time"]) == 0:
                    result["start_time"] = time.strftime("%Y-%m-%d %H:%M:%S",time.localtime())
                    result["title"] = r.json()['data']["live_room"]["title"]
                    result["uid"] = uid
            else:
                #print("{name} {uid} is not on streaming".format(uid=uid,name=r.json()["data"]["name"]))
                if result["onLive"]:
                    result["end_time"] = time.strftime("%Y-%m-%d %H:%M:%S",time.localtime())
                    print("LiveStream end with result ",result)
                    result["onLive"] = False
                    print("\n")
                    #直播结束
            time.sleep(self.intervel)

if __name__ == "__main__":
    uid = ["672342685","672328094","351609538","672353429","672346917"]
    a = Bot(uid)