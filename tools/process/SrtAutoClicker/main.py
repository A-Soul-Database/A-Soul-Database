import os,json,time,sys,hashlib
import pyautogui as gui
from srtParser import draft_content,simple_srt
import logging

class GetSrt():

    Config = {}
    videoList = []
    FinishedList = []

    def __init__(self):
        with open("config.json","r",encoding="utf-8")as f:
            self.Config = json.loads(f.read())
        #获取视频列表
        videoFormat = ["mp4","flv"]
        self.videoList = [fn for fn in os.listdir(self.Config["videoDir"])
         if any(fn.endswith(formats) for formats in videoFormat)
        ]
        self.confidence = self.Config["confidence"]
        self.theme = self.Config["theme"]

    def parseSrtPart(self,path)->bool:
        """"""
        name = path.split(".")[0]
        logging.info("start parsing srt for" + path)
        #1.导入素材
        try:
            x,y,width,height = gui.locateOnScreen("./position/add.png",confidence=self.confidence)
            gui.click(x+width/2,y+height/2)
        except:
            logging.error("error in finding add button!")
            return False
            #选择媒体资源
            #路径框识别
        time.sleep(2)
        try:
            x,y,width,height = gui.locateOnScreen("./position/PathBar_"+self.theme+".png",confidence=self.confidence)
            gui.click(x+width/2,y+height/2)
            gui.typewrite(self.Config["videoDir"])
            gui.press("enter")
                #文件名框选择
            x,y,width,height = gui.locateOnScreen("./position/FileName_"+self.theme+".png",confidence=self.confidence)
            gui.click(x+width/2+50,y+height/2)
            gui.typewrite(path)
                #打开按钮
            x,y,width,height = gui.locateOnScreen("./position/Open_"+self.theme+".png",confidence=self.confidence)
            gui.click(x+width/2,y+height/2)
            time.sleep(2)
        except:
            logging.error("error in selecting files,please check system "+self.theme+"/Light , filepath")
            return False
            #选择第一个媒体元素
        try:
            x,y,width,height = gui.locateOnScreen("./position/add_small.png",confidence=self.confidence)
            gui.moveTo(x+(width/2)*3,y+height/2)
                #拖拽到空轨道
            x,y,width,height = gui.locateOnScreen("./position/empty_Track.png",confidence=self.confidence)
            gui.dragTo(x+width/2,y+height/2,button="left",duration=0.4)
        except:
            logging.error("error in drag media into tracks")
            return False
        #2.字幕识别
            #文本按钮
        try:
            x,y,width,height = gui.locateOnScreen("./position/text.png",confidence=self.confidence)
            gui.click(x+width/2,y+height/2)
                #智能字幕
            time.sleep(1)
            x,y,width,height = gui.locateOnScreen("./position/AutoSrt.png",confidence=self.confidence)
            gui.click(x+width/2,y+height/2)
                #清空已有字幕
            time.sleep(0.5)
            x,y,width,height = gui.locateOnScreen("./position/ClearSrts.png",confidence=self.confidence)
            gui.click(x+width/2,y+height/2)
                #开始识别
            x,y,width,height = gui.locateOnScreen("./position/srt.png",confidence=self.confidence)
            gui.click(x+width/2,y+height*6/7)
        except:
            logging.error("error in start parsing srt")
            return False
        time.sleep(1)
        while True:
            #持续中
            try:
                with open(self.Config["draftContentPath"],"rb") as f:
                    f.close()
            except PermissionError:
                time.sleep(2)
                break


        #3.字幕提取
        self.SrtMain((self.Config["draftContentPath"],name))
            #点击“媒体”  
        
        
        time.sleep(3)
        x,y,width,height = gui.locateOnScreen("./position/media.png",confidence=self.confidence)
        gui.click(x+width/2,y+height/2)
        #4.移除媒体文件
        time.sleep(1)
        x,y,width,height = gui.locateOnScreen("./position/add_small.png",confidence=self.confidence)
        gui.click(x+(width/2)*3,y+height/2)
        time.sleep(1)
        gui.press("backspace")
        time.sleep(1)
        x,y,width,height = gui.locateOnScreen("./position/confirm.png",confidence=self.confidence)
            
        gui.click(x+width/4,y+height*6/7)
        try:
            pass
        except:
            logging.error("error in removing media file")
            return False
        self.FinishedList.append(name)
        return True

    def parseSrt(self):
        for i in self.videoList:
            result = self.parseSrtPart(i)
            time.sleep(2)
            if result != True:
                logging.error("error in handeling video " + i)
                break
            else:
                logging.info(f"{i} is done")
        logging.info("finished:  "+self.FinishedList)

    def SrtMain(self,args):
        name = args[1]
        draft_content_directory = args[0]
        tracks = draft_content.read_draft_content_src(draft_content_directory)

        with open(name+".srt", 'w', encoding='utf-8') as f:
            f.write(simple_srt.tracks_to_srt_string(tracks))
    
    def Md5Calcu(self):
        with open(self.Config["draftContentPath"],"rb") as f:
            draftContent = f.read()
        return hashlib.md5(draftContent).hexdigest()
GetSrt().parseSrt()
