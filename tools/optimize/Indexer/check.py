import json

with open("main.json","r",encoding="utf-8") as f:
    main=json.loads(f.read())

with open("indexer.json","r")as f:
    indexer = list(f.read())
for i in range(len(indexer)):
    if indexer[i]!=main[i]["bv"]:
        print("error",i)
