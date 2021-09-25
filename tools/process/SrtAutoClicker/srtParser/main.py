from draft_content import read_draft_content_src
from simple_srt import tracks_to_srt_string

def SrtMain(args):
    args = args.split(",")
    name = args[1]
    draft_content_directory = args[0]
    
    if not draft_content_directory:
        draft_content_directory = r'C:\Users\ppzzh\AppData\Local\JianyingPro\User Data\Projects\com.lveditor.draft\202109180746\draft_content.json'

    tracks = read_draft_content_src(draft_content_directory)

    with open(name+".srt", 'w', encoding='utf-8') as f:
        f.write(tracks_to_srt_string(tracks))
    
    input('请查收 subtitles.srt。')

if __name__ == '__main__':
    args = input("请输入 draft_content.json 的地址>>,保存文件名称")
    SrtMain(args)
