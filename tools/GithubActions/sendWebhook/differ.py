"""
differ.py
 因为GitHub actions使用了trilom/file-changes-action@v1.2.4
 对比文件差异
"""
import os
import json
import time

HOME = os.getenv("HOME")
def differ():
    """
    差异对比
    """
    allChanges = json.loads(open(f"{HOME}/files.json").read())
    result = {
        "time":time.time(),
        "db":False,
        "web":False,
        "tools":False
    }

    for i in allChanges:
        case = i.split("/")[0]
        if case == "tools":
            result["tools"] = True
        if case == "db":
            result["db"] = True
        if case == "build":
            result["web"] = True
    if result["web"]:
        os.system('echo "::set-output name=WebUpdate::1"')
    else:
        os.system('echo "::set-output name=WebUpdate::0"')

    os.system(f'echo "::set-output name=ChangesJson::{str(result)}"')


if __name__ == "__main__":
    differ()