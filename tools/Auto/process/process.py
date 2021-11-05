import os
import shutil 

class Auto:
    def __init__(self,sourcePth:str="./",YearPath:str="../../../../A-Soul-Data/db/") -> None:
        self.dir = ""
        self.sourcePth = self.dir + sourcePth
        self.YearPath = self.dir + YearPath
        

    def process(self):
        StepList = [
            ["components/1tags/autoTag.py","months",True],
            ["components/2srt/srtChange.py","months",True],
            ["components/2srt/srtChange.json","months",False],
            ["components/3searchindex/searchindex.py","months",True],
            ["components/3searchindex/year.py","year",True],
            ["components/4mainGen/main.py","year",True],
            ["components/5Indexer/Indexer.py","year",True],
        ]
        Years = ["2021"]
        Months = ["01","02","03","04","05","06","07","08","09","10","11","12"]

        for year in Years:
            for Month in Months:
                for i in StepList:
                    name = i[0].split("/")[-1]
                    destpath = self.YearPath + year + "/" + Month + "/" + name if i[1] == "months" else self.YearPath + year + "/" + name
                    shutil.copy(self.sourcePth + i[0],destpath)
                    if i[2]:
                        os.system("cd {Yearpath} && py {destpath}".format(Yearpath=self.YearPath,destpath=destpath))


if __name__ == "__main__":
    Auto().process()