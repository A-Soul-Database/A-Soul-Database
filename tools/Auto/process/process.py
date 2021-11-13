#!/usr/local/bin/python
# -*- coding:utf-8 -*-
"""
    Process All In One
"""
import os
import json
import re
import requests
import logging

logging.basicConfig(filename='logger.log', level=logging.INFO)

class Auto:
    def __init__(self,Target_Path:str="./") -> None:
        self.Target_Path = os.path.abspath(Target_Path)
        self.process()

    def result_Resolving(self,status:bool,item:str)->bool:
        """
            可以对logging重写,但
        """
        if status:
            logging.info("{items} 已处理完成".format(items=item))
        else:
            logging.error("{items} 处理出错".format(items=item))
        return status

    def process(self)->bool:
        Dirs = self.FindAllDirs()
        result = False
        for month in Dirs["months"]:
            logging.info("\r正在处理{months}".format(months=month))
            self.path = month
            result = self.result_Resolving(self.Tagged(),"打时间轴")
            result = self.result_Resolving(self.SrtChange(),"字幕替换")
            result = self.result_Resolving(self.SearchIndex(),"月度搜索索引")
        self.result_Resolving(result,"月度处理")
        for year in Dirs["year"]:
            self.path = year
            self.months = [fn for fn in os.listdir(self.path) if os.path.isdir(self.path+"/"+fn)]
            result = self.result_Resolving(self.SearchIndex(typ="year"),"年度搜索索引")
            result = self.result_Resolving(self.MainGenerator(),"年度主索引")
            result = self.result_Resolving(self.Indexer(),"年度Bv索引")
            self.FillCover()
        return result


    def FindAllDirs(self,path:str="E:\projects/as\A-Soul-Data\db/2021",result:dict={"year":[],"months":[]})->dict:
        """
            遍历文件夹及子文件夹
        """
        monthIdentify = ["srt","schedule","timeline"]
        for i in os.listdir(path):
            if i == "Cover.json":
                result["year"].append(path)
            if os.path.isdir(path + "/" + i):
                if i in monthIdentify:
                    result["months"].append(path)
                    break
                else:
                    self.FindAllDirs(path+"/"+i,result)
            else:
                pass
        return result


    def Tagged(self)->bool:
        """
            打时间戳
        """
        Main_Json = json.loads(open(self.path+"./main.json",'r',encoding="utf-8").read())
        try:
            for i in range(len(Main_Json)):
                bv = Main_Json[i]["bv"]
                try:
                    Main_Json[i]["tags"] = open(self.path+f"/timeline/{bv}.txt","r",encoding="utf-8").read().split("\n")
                except FileNotFoundError as e :
                    logging.debug(f"{bv} 的轴可能没有 (需要补全) \n")
            open(self.path+"./main.json",'w',encoding="utf-8").write(str(Main_Json).replace("'",'"'))
            return True
        except Exception as e:
            logging.error(e)
            return False


    def SrtChange(self)->bool:
        """
            字幕戳转换
        """
        Main_Json = json.loads(open(self.path+"./main.json",'r',encoding="utf-8").read())
        srt_change_dict = json.loads(open("./srtChange.json","r",encoding="utf-8").read())
        keywords= [n for n in srt_change_dict]
        result = True
        for i in Main_Json:
            bv = i["bv"]
            clip = i["clip"]
            srts = []
            srts= [f"{bv}.srt" if clip==1 else f"{bv}-{n}.srt" for n in range(1,clip+1)]
            for name in srts:
                try:
                    raw_sbutitles = open(self.path + f"/srt/{name}",encoding="utf-8").read()
                    for k in keywords:
                        raw_sbutitles = raw_sbutitles.replace(k,srt_change_dict[k])
                    open(self.path + f"/srt/{name}",'w',encoding="utf-8").write(raw_sbutitles)
                except Exception as e:
                    logging.error(e)
                    result = False
                    continue
        return result


    def SearchIndex(self,typ:str="month")->bool:
        """
            搜索索引
                year
                month
        """
        if typ == "month":
            search = {}
            Main_Json = json.loads(open(self.path+"./main.json",'r',encoding="utf-8").read())
            for i in range(len(Main_Json)):
                this_dict = {"title":Main_Json[i]["title"],"type":"","tags":Main_Json[i]["tags"],"srt":""}
                for activities in Main_Json[i]["items"]:
                    this_dict["type"] = ','.join(fn[0] for fn in activities["item"])
                    """
                        items结构:
                            {'items':[
                            {    ---- activities1
                                    'name':'game',
                                    'item':[
                                        ['TARGET','1-:11:11',['A']] --- fn1
                                        ['TARGET2','2-22:22',['B']] --- fn2
                                    ]
                                },{    --- activities2
                                ...
                                }
                            ]}
                    """
                srt_content = ""
                srts = [f"{Main_Json[i]['bv']}.srt" if Main_Json[i]['clip']==1 else f"{Main_Json[i]['bv']}-{n}.srt" for n in range(1,Main_Json[i]['clip']+1)]
                for srt in srts:
                    srt_content += open(self.path+f"/srt/{srt}",encoding="utf-8").read()
                srt_content.replace("'","")
                srt_content.replace('"',"")
                for fn in ["((?=[\x21-\x7e]+)[^A-Za-z0-9])",r"\n","[0-9]"]:
                    srt_content =  re.sub(fn,"",srt_content)
                this_dict["srt"] = srt_content
                search[Main_Json[i]["bv"]] = this_dict
            open(self.path+"./search.json",'w',encoding="utf-8").write(str(search).replace("'",'"'))
        if typ == "year":
            try:
                search = {}
                for month in self.months:
                    tmp = json.loads(open(self.path+"/"+month+"/search.json",'r',encoding="utf-8").read())
                    search = {**search,**tmp}
                open(self.path+"./search.json",'w',encoding="utf-8").write(str(search).replace("'",'"'))
            except Exception as e:
                logging.error(e)
                return False
        return True
    

    def MainGenerator(self)->bool:
        """
            Main.json 生成器
        """
        main = []
        for i in self.months:
            main.extend(json.loads(open(self.path+"/"+i+"/main.json",'r',encoding="utf-8").read()))
        open(self.path+"./main.json",'w',encoding="utf-8").write(str(main).replace("'",'"'))
        return True


    def Indexer(self)->bool:
        """
            Item 索引
        """
        Main_Json = json.loads(open(self.path+"./main.json",'r',encoding="utf-8").read())
        indexer = [fn["bv"] for fn in Main_Json]
        open(self.path+"./indexer.json",'w',encoding="utf-8").write(str(indexer).replace("'",'"'))
        return True

    def FillCover(self)->list:
        """
            新增的Bv添加封面
            https://api.bilibili.com/x/web-interface/view?bvid={bv}
        """
        Indexer = json.loads(open(self.path+"./indexer.json",'r',encoding="utf-8").read())
        Cover_Json = json.loads(open(self.path+"./Cover.json",'r',encoding="utf-8").read())
        Add_List = []
        for i in Indexer:
            if Cover_Json.get(i) ==None:
                r = requests.get("https://api.bilibili.com/x/web-interface/view?bvid={i}".format(i=i),headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/'})
                Cover_Json[i] = r.json()["data"]["pic"].replace("http","https")
                Add_List.append(i)
        open(self.path+"./Cover.json",'w',encoding="utf-8").write(str(Cover_Json).replace("'",'"'))
        logging.info("封面补全 已处理完成")
        return Add_List

if __name__ == "__main__":
    Auto()