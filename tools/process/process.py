"""
处理数据库的模组

    运行: python process.py --mode=addNew / package
    addNew: 需要填写 update.json 的一些基础信息(如直播时间，出镜人物，服饰，活动，时间轴连接等) 然后脚本会自动获取封面等,更新内容 但是暂时还不能自动识别字幕(GitHub actions没有gui)
    package: 把已经提供的json和字幕等文件进行简单的包装，用于生产环境
"""
import argparse
import os
import shutil
import json
import requests
import datetime

MONTHS = ["01","02","03","04",
    "05","06","07","08","09","10","11","12"
]
YEARS = ["2021"]
SHELL = "py"
HOMEDICT = "../../db"

def package():
    """
    package 的实现
    运行目录为tools/process 目标目录为 db/2021
    """
    for year in YEARS:
        for month in MONTHS:
            try:
                # 构建一个元组类型 前两个元素为本地路径和目标路径 第三个元素为是否可执行
                filepaths = [("components/1tags/autoTag.py",f"{HOMEDICT}/{year}/{month}/",True),
                            ("components/2srt/srtChange.py",f"{HOMEDICT}/{year}/{month}/srt/",True),
                            ("components/2srt/srtChange.json",f"{HOMEDICT}/{year}/{month}/srt/",False),
                            ("components/3searchindex/searchindex.py",f"{HOMEDICT}/{year}/{month}/",True),
                            ("components/3searchindex/year.py",f"{HOMEDICT}/{year}/",True),
                            ("components/4mainGen/main.py",f"{HOMEDICT}/{year}/",True),
                            ("components/5Indexer/Indexer.py",f"{HOMEDICT}/{year}/",True)]
                for items in filepaths:
                    #复制文件
                    shutil.copy(items[0],items[1])

                for items in filepaths:
                    #执行文件
                    if items[2]:
                        filename = items[0].split("/")[-1]
                        os.system(f"{SHELL} {items[1]}{filename}")

                for items in filepaths:
                    #删除已经执行的文件
                    filename = items[0].split("/")[-1]
                    os.remove(f"{items[1]}{filename}")

            except FileNotFoundError:
                print(f"cannot move files into {year}/{month}")          
            finally:
                pass

def new():
    """
    自动更新内容 没写完
    """
    newJson = json.loads(open("./update.json").read())
    year = datetime.datetime.now().date().strftime("%Y")
    month = newJson["date"].split("-")[0] if len(newJson["date"].split("-")[0])==2 else "0"+newJson["date"].split("-")[0]
    r = requests.get(f"https://bilibili.com/{newJson['bv']}")

parser = argparse.ArgumentParser(description="请选则具体模式")
parser.add_argument("--mode",type=str,choices=["addNew","package"])
args = parser.parse_args()
if args.mode == "package":
    package()
elif args.mode == "addNew":
    new()
