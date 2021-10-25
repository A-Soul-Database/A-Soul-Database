import requests
import sys
import json
from requests.exceptions import RequestException

def sendWebhooks():
    """
    发送webhook, differ已经存在了differ
    """
    differ = sys.argv[1]
    differ = json.loads(differ)
    TargetWebList = open("tools/GithubActions/sendWebhook/sendList.txt").read().split("\n")
    for i in TargetWebList:
        try:
            print(f"trying to send webhook to{i}")
            print(f"Post info with result {requests.post(i,json=differ).status_code}")
        except RequestException:
            print(f"An error occured while post info to {i}")
    sys.exit()


if __name__=="__main__":
    sendWebhooks()
