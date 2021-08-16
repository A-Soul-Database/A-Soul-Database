# coding=UTF-8
import jieba.analyse,os

sentence = ""
with open("test.txt","r",encoding="utf-8")as f:
    sentence=f.read()
filename = os.listdir(os.getcwd()+"/stopwords")
stopwords = []
for i in filename:
    with open("stopwords/"+i,"r",encoding="utf-8") as f:
        stopwords+=f.read().split("\n")

for i in stopwords:
    sentence.replace(i,"")

result = jieba.analyse.textrank(sentence, topK=80, withWeight=False, allowPOS=('ns', 'n', 'vn', 'v'))
print(result)