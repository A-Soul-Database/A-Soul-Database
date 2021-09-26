###专有名词简单替换
import os ,json

#get files
filename = [fn for fn in os.listdir(os.getcwd())
         if any(fn.endswith(formats) for formats in "srt")
        ]

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

    srtSpace = raw.replace(" ","")
    if srtSpace.find("\n\n\n\n") !=-1:
        raw = raw.replace("\n \n \n ")
        raw = raw.replace(" \n \n \n")

    with open(i,"w",encoding="utf-8")as f:
        f.seek(0)
        f.write(raw)
        print("%s is done!" %i) 