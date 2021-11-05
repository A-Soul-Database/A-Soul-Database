import json
with open("./main.json","r",encoding="utf-8")as f:
    main = json.loads(f.read())
    f.close()

indexer = []
for i in range(len(main)):
    indexer.append(main[i]["bv"])

with open("./indexer.json","w")as f:
    f.write(str(indexer).replace("'",'"'))
    f.close()