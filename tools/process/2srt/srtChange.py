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

with open("srtChange.json","r",encoding="utf-8") as f:
    text = f.read()
    f.close()
words = json.loads(text)
wordlist = []
for k in words:
    wordlist.append(k)
for i in filename:
    with open(i,"r",encoding="utf-8") as f:
        raw = f.read()
        f.close()
    for z in wordlist:
        raw = raw.replace(z,words[z])
        
    with open(i,"w",encoding="utf-8")as f:
        f.seek(0)
        f.write(raw)
        print("%s is done!" %i) 