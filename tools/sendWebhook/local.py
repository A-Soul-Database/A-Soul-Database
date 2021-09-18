import requests,os,json,time

def main():

    result = {
        "time":int(time.time()),
        "db":False,
        "web":False,
        "tools":False
    }
    requests.post("http://127.0.0.1:8988",json=result)

main()