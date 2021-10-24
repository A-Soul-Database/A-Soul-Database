"""
Blil Dynamtic Bot
"""

import requests
import json
import time

class Bot():

    config = {
        "users":["672328094","672342685","351609538","672353429","672346917"],
        "interval":60,
        "Durl":"https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/space_history"
    }
    
    def getInfo(self,uid:str,offset:str)->str:
        """
        递归获取动态json文件
        uid:用户Id offset:偏移量 info:之前的目录
        """
        if offset is None or offset == "":
            offset = "0"
        time.sleep(1)
        r = requests.get(self.config["Durl"],params={"host_uid":uid,"offset":offset})
        info = r.json
        return info
        
    def JustGetAllDynamtic(self,uid:str)->dict:
        """
        单纯的获取所有动态
        """
        content = {}
        while True:
            this_content = self.getInfo("","0")
            
        return content