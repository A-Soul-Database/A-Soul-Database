###专有名词简单替换
import os ,json

#get files
filename = os.listdir(os.getcwd())
for i in filename:
    name = i.split(".")[-1].lower()
    if name != "srt":
        filename.remove(i)

print(filename)
print("Useage:\n1.Make Sure You have srtChange.txt in same dirctory.\n2.put this file and srtChange.txt into srt directory.\n3.run")

stopword = []
filename2 = os.listdir(os.getcwd()+"/stopwords")
for n in filename2:
    with open("stopwords/"+n,"r",encoding="utf-8") as f:
        stopword.append(f.read())

with open("srtChange.json","r",encoding="utf-8") as f:
    text = f.read()
words = json.loads(text)
for i in filename:
    with open(i,"r+",encoding="utf-8") as f:
        raw = f.read()
        for item in words:
            try:
                raw = raw.replace(item,words[item])
            except:
                print("dont have word %s" ,item)
        for i in stopword:
            try:
                raw = raw.replace(i,"")
            except:
                print("dont have")
        f.seek(0)
        f.write(raw)
        print("%s is done!",i)