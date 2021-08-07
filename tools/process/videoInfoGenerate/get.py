import requests,sys


bv = "BV1k44y117Y1"

r = requests.get("https://www.bilibili.com/"+bv)
print(r.text)