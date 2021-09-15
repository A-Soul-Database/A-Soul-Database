import requests,os,json,time

def main():

    result = {
        "time":int(time.time()),
        "db":False,
        "web":False,
        "tools":False
    }
    requests.post("",json=result)

main()