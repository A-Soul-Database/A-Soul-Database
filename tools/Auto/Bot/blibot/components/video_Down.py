"""
Bili 视频下载
bv:str 
p:list
qn{
    16: 360P mp4
    32: 480P flv
    64: 720P flv
    ------ 以下需要登录Cookies才能下载
    80: 1080P flv
    116: 1080P60F flv
}
"""
import requests
from contextlib import closing
import logging
class down:

    headers = {
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/93.0",
        "Referer":"https://www.bilibili.com/",
    }

    def __init__(self,bv:str,p:list=["1"],qn:str="16",path:str="./") -> None:
        self.bv = bv
        self.p = p
        self.qn = qn
        self.path = path
        self.Video_Download(self.Get_Info())

    def Get_Info(self)->dict:
        Bili_Video_Info_Api = f"https://api.bilibili.com/x/web-interface/view?bvid={self.bv}"
        Bili_Video_Info_Json = requests.get(Bili_Video_Info_Api,headers=self.headers).json()

        if len(Bili_Video_Info_Json["data"]["pages"]) < len(self.p):
            print("请求的分P数大于视频分P数,下载全部分P")
            self.p = [str(i) for i in range(1,len(Bili_Video_Info_Json["data"]["pages"])+1)]

        infos = {
            "bv":self.bv,
            "cover":Bili_Video_Info_Json["data"]["pic"],
            "title":Bili_Video_Info_Json["data"]["title"],
            "p":[],
        }

        for i in self.p:
            #循环获得每个分P的信息格式 ["分P","Cid","名字(P1 录播/p2 录播【弹幕】)"]
            infos["p"].append([ self.p, Bili_Video_Info_Json["data"]["pages"][int(i)-1]["cid"], Bili_Video_Info_Json["data"]["pages"][int(i)-1]["part"] ])

        return infos



    def Video_Download(self,infos:dict)->bool:
        result = False
        formats = "mp4" if self.qn == "16" else "flv"
        for i in infos["p"]:
            url = f"https://api.bilibili.com/x/player/playurl?bvid={infos['bv']}&cid={i[1]}&qn={self.qn}&otype=json"
            
            Video_Info_Json = requests.get(url,headers=self.headers).json()
            Video_Durl = Video_Info_Json["data"]["durl"][0]["url"]
            name = infos["bv"] if len(infos["p"]) == 1 else f"{infos['bv']}-{i[0]}"
            Video_Name = f"{name}.{formats}"
            result = self.Download(Video_Durl,Video_Name)
        return result



    def Download(self,url,name)->bool:
        try:
            with closing(requests.session().get(url,headers=self.headers,stream=True)) as response:
                chunk_size = 1024
                content_size = int(response.headers['content-length'])
                data_count = 0
                with open(f"{self.path}{name}", "wb") as file:
                    for data in response.iter_content(chunk_size=chunk_size):
                        file.write(data)
                        data_count = data_count + len(data)
                        now_jd = (data_count/content_size) * 100
                        print("\r" + "下载进度：%d%%(%d/%d)" % (now_jd, data_count, content_size), end="" )
            logging.log("Donwload Success")
        finally:
            return True


if __name__ == "__main__":
    down("BV1SP4y1W7hu")