import os,sys

SRTLIST = []

def __init__():
    global SRTLIST
    SRTLIST = os.listdir(os.getcwd())
    for i in SRTLIST:
        if i.split(".")[-1].lower() != "srt":
            SRTLIST.remove(i)


def srtLineCheck():
    __init__()
    for i in SRTLIST:
        with open(i,"r",encoding="utf-8")as f:
            try:
                srt = f.read()
            except IOError:
                print(f"error in opening or encoding srt file {i}")
                sys.exit()
            finally:    
                f.close()
        srtSearch = srt.replace(" ","")
        if srtSearch.find("\n\n\n\n") != -1:
            srt.replace("\n\n\n\n","\n\n\n")
            print(f"error in file {i},it may occur some wrong in opening srt in web,fixed")
            with open(i,"w",encoding="utf-8") as f:
                f.seek(0)
                f.write(srt)
                f.close()



srtLineCheck()