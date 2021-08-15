import json,re
out = {}
temp = {}
month = ["01","02","03","04","05","06","07","08"]
for i in month:
    with open(i+"/search.json","r",encoding="utf-8")as f:
        temp = json.loads(f.read())
        f.close()
    out = {**out,**temp}

with open("search.json","w",encoding="utf-8") as f:
    f.write(str(out).replace("'",'"'))
    f.close()