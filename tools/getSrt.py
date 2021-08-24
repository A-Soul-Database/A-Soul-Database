import requests
import json

#网络获取
# def getJsonData(url):
#     response = requests.get(url)
#     return json.loads(response.text)

#本地获取
def getJsonData(url):
    f = open(url)
    text = f.read()
    f.close()
    return json.loads(text)
# 网络获取
# def getData(url):
#     response = requests.get(url)
#     return response.text
#本地获取
def getData(url):
    f = open(url)
    text = f.read()
    f.close()
    return text

def getSubtitles(bv):
    index = indexerList.index(bv)
    clip = int(mainJson[index]["clip"])
    month = mainJson[index]["date"].split("-")[0]
    srt = ""
    if len(month)== 1:
        month="0"+month
    if clip==1:
        srt = getData(sourceUrl+"/db/2021/"+month+"/srt/"+bv+".srt")
    else:
        for i in range(1,clip+1):
            srt =srt + getData(sourceUrl+"/db/2021/"+month+"/srt/"+bv+"-"+str(i)+".srt")
            srt += "\n\n"#切片结尾符号
        
    srtArr = srt.split("\n")
    
    subtitles = []
    for i in range(0,len(srtArr)-2,4):
        subtitle = srtArr[i]+"|"+srtArr[i+1]+"|"+srtArr[i+2]
        subtitles.append(subtitle)
    subtitlesArr[bv] = subtitles

# build = "V1.30"
# sourceUrl = "https://cdn.jsdelivr.net/gh/peterpei1186861238/ASDB@"+build
# sourceUrl = "https://raw.githubusercontent.com/peterpei1186861238/A-Soul-Database/main"
sourceUrl=".."
searchJson = getJsonData(sourceUrl+"/db/2021/search.json")
mainJson = getJsonData(sourceUrl+"/db/2021/main.json")
    
indexerList = getJsonData(sourceUrl+"/db/2021/indexer.json")
subtitlesArr = {}
def main():
    
    # subtitlesArr = []
    for n in range(len(indexerList)):
        bv = mainJson[n]["bv"]
        
        getSubtitles(bv)
        print("Finish "+str(n),end='\r')
    print("Finish all "+str(len(indexerList))+" requests")
    f = open("../db/srt.json","w",encoding='utf8')
    json.dump(subtitlesArr,f,ensure_ascii=False)
    


if __name__ == "__main__":
    main()
