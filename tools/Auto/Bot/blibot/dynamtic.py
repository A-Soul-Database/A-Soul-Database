"""
Blil Dynamtic Bot
TYPE 1 转发
type 2 原创图文
type 8 原创视频
type 4 原创文字?
"""

import requests
import json
import time
import argparse
from threading import Thread
class Bot():
    headers = {
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/93.0",
    }
    config = {
        "users":["672328094","672342685","351609538","672353429","672346917","703007996"],
        "interval":10,
        "Durl":"https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/space_history"
    }
    
    def getInfo(self,uid:str,offset:str="0")->str:
        """
        递归获取动态json文件
        uid:用户Id offset:偏移量 info:之前的目录
        """
        if offset is None or offset == "":
            offset = "0"
        time.sleep(1)
        r = requests.get(self.config["Durl"],params={"host_uid":uid,"offset_dynamic_id":offset},headers=self.headers)
        r.encoding="utf-8"
        info = json.loads(r.content)
        return info

    def JustGetAllDynamtic(self,uid:str,content:dict,offset:str="0")->dict:
        """
        单纯的获取所有动态
        """
        if len(offset) == 0:
            offset = "0"
        while True:
            this_content = self.getInfo(uid,offset)
            try:
                nextOffset = str(this_content["data"]["next_offset"])
            except IndexError:
                nextOffset = "0"
            try:
                cardInfo = this_content["data"]["cards"]
                for i in cardInfo:
                    del i["desc"]["user_profile"]
                content["dynamtics"].append(cardInfo)
            except KeyError:
                pass
            if nextOffset == "0":
                break
            else:
                print(f"nextOffset is {nextOffset}")
                self.JustGetAllDynamtic(uid,content,nextOffset)
            return content

    def Monitor(self,uid:str,intervel:int=10):
        """
        动态监视器
        uid 用户id intervel 间隔
        True代表有更新
        """
        print(f"--------start monitor dynamtic of {uid}--------")
        try:
            last_dynamtic_id = self.getInfo(uid)["data"]["cards"][0]["desc"]["dynamic_id_str"]
        except:
            return
        i = 0
        while True:
            time.sleep(intervel)
            thisJson = self.getInfo(uid)
            this_dynamtic_id = thisJson["data"]["cards"][0]["desc"]["dynamic_id_str"]
            if this_dynamtic_id != last_dynamtic_id:
                #有更新
                try:
                    info = json.loads(thisJson["data"]["cards"][0]["card"].replace('\"','"'))
                    name = info["user"]["uname"]
                    detail = info["item"]["content"]
                except IndexError:
                    name = ""
                    detail = ""
                i+=1
                if i%10 ==0:
                    print(f"have checked for {i} times")
                print("received update")
                print(f"{name}的B站动态更新了\n{detail}")
                last_dynamtic_id = this_dynamtic_id
        
    def Monitor_Asoul(self,intervel:int=10):
        pass

if __name__ == "__main__":
    """
     py .\dynamtic.py --type=monitor --uid 672328094,672342685,351609538,672353429,672346917,703007996
    """
    a = Bot()
    parser = argparse.ArgumentParser()
    parser.add_argument("--type",type=str,help="类型 all/ single/ monitor")
    parser.add_argument("--uid",type=str,default="672328094",help="目标uid，多个请用逗号隔开")
    args = parser.parse_args()
    try:
        uids = args.uid.split(",")
    except IndexError:
        uids = [args.uid]
    #uids = ["672328094","672342685","351609538","672353429","672346917","703007996"]
    #672328094,672342685,351609538,672353429,672346917,703007996
    for uid in uids:
        content = {
            "uid":uid,
            "dynamtics":[]
        }
        if args.type == "all":
            print(f"--------grab all info of {uid}--------")
            open(f"./{uid}.json","w",encoding="utf-8").write(str(a.JustGetAllDynamtic(uid,content)))
        elif args.type == "single":
            print(f"--------grab latest info of {uid}--------")
            open(f"./{uid}.json","w",encoding="utf-8").write(a.getInfo(uid))
        elif args.type == "monitor":
            t = Thread(target=a.Monitor,args=(uid,))
            t.start()