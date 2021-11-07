"""
Comments.py
BiliBIli 评论爬虫
例如: 在新视频发布之后,希望第一时间获取轴man的轴 感谢所有轴男对as和asdb的贡献

https://api.bilibili.com/x/v2/reply/main?jsonp=jsonp&next=0&type=1&oid={av}&mode=0   || root={} 楼中楼,root表示根id pn={} 表示楼中楼的页数
"""
import requests
import time
class Bot():
    headers = {
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/93.0",
    }

    def __init__(self,bv:str,uid) -> None:
        self.uid = []
        self.bv = bv
        self.av = self.Convert2Av(bv)
        if type(uid) == str:
            self.uid.append(uid)
        else:
            self.uid = uid
        
    def Monitor(self,intervel:int=10)->None:
        """
        每隔intervel就可以更新一次
        """
        while True:
            result = self.GetComments()
            if result["code"] == 1:
                print(f"\r更新成功\n{result['contents']}",end="")
            else:
                print("\r没有新评论",end="")
            time.sleep(intervel)


    def GetComments(self)->dict:
        """
        获取评论
            楼中楼:[[]]使用 list嵌套
        """
        uid = self.uid
        returning = {
            "code":0,
            "uid":uid,
            "contents":[]
        }
        if len(uid) == 0:
            return returning
        else:
            #先看置顶(我也不到置顶会不会在普通评论里占坑)
            r = requests.get(f"https://api.bilibili.com/x/v2/reply/main?jsonp=jsonp&next=0&type=1&oid={self.av}&mode=0",headers=self.headers)
            try:
                if str(r.json()["data"]["top"]["upper"]["mid"]) in self.uid:
                    returning["code"] = 1
                    returning["contents"].append(r.json()["data"]["top"]["upper"]["content"]["message"])
                    returning["contents"].append(self.Comments_In_Floor(r.json()["data"]["top"]["upper"]["rpid"]))
            except TypeError:
                print("\r没有置顶",end="")
            #再看普通评论
            start = 0
            while True:
                url = f"https://api.bilibili.com/x/v2/reply/main?jsonp=jsonp&next={start}&type=1&oid={self.av}"
                r = requests.get(url,headers=self.headers)
                if r.json()["data"]["replies"] == None:
                    break
                for i in r.json()["data"]["replies"]:
                    if str(i["member"]["mid"]) in self.uid:
                        returning["code"] = 1
                        returning["contents"].append(i["content"]["message"])
                        returning["contents"].append(self.Comments_In_Floor(i["rpid"]))
                start += 1
                time.sleep(1)
        return returning

    def Comments_In_Floor(self,root:str)->list:
        """
        获取楼中楼
        """
        step = 0
        result = []
        while True:
            url = f"https://api.bilibili.com/x/v2/reply/reply?jsonp=jsonp&pn={step}&type=1&oid={self.av}&root={root}"
            r = requests.get(url,headers=self.headers)
            if r.json()["data"]["replies"] == None:
                break
            for i in r.json()["data"]["replies"]:
                if i["member"]["mid"] in self.uid:
                    result.append(i["content"]["message"])
            step += 1
        return result

    def Convert2Av(self,bv:str)->str:
        """
        @mcfx zhihu
        """
        table='fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF'
        tr={}
        for i in range(58):
            tr[table[i]]=i
        s=[11,10,3,8,4,6]
        xor=177451812
        add=8728348608
        r=0
        for i in range(6):
            r+=tr[bv[s[i]]]*58**i
        return (r-add)^xor

if __name__ == "__main__":
    a = Bot("BV1kQ4y1m76U","53082699")
    a.Monitor()