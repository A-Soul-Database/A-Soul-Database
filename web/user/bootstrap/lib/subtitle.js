searchJson={};
indexerList={};
mainJson = {};
if(!Object.keys(searchJson).length){searchJson=getJsonData("https://cdn.jsdelivr.net/gh/peterpei1186861238/ASDB@"+build+"/db/2021/search.json")};
if(!Object.keys(mainJson).length){mainJson=getJsonData("https://cdn.jsdelivr.net/gh/peterpei1186861238/ASDB@"+build+"/db/2021/main.json")};
if(!Object.keys(CoverJson).length){CoverJson=getJsonData("https://cdn.jsdelivr.net/gh/peterpei1186861238/ASDB@"+build+"/db/2021/Cover.json")}
if(!Object.keys(indexerList).length){indexerList=getJsonData("https://cdn.jsdelivr.net/gh/peterpei1186861238/ASDB@"+build+"/db/2021/indexer.json")}
Html = ""
for(n in indexerList){
    title = searchJson[indexerList[n]]["title"];
    bv = mainJson[n]["bv"];
    cover = CoverJson[bv];
    content="<img src='https://i0.hdslb.com/bfs/article/ca4ef2f3f5bfab4d3a59bac40e677120a1e87552.gif' style='height:30vw;'><b style='color:#b8a6d9'>珈乐正在抄写歌词</b>";
    Html = `<div class="col"><div class="card"><img src="${cover}" style="height: 13vw;object-fit: cover;" class="card-img-top"><div class="card-body"><h5 class="card-title">${title}</h5><button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#modal-${bv}" onclick="viewDetail('${bv}');"><i class="fas fa-info"></i></button><div class="modal fade" id="modal-${bv}" tabindex="-1" aria-labelledby="modal-${bv}-content" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="modal-${bv}-content">${title}</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body" id="${bv}-Content">${content}</div></div></div></div></div></div></div>${Html}`;
}
document.getElementById("SubList").innerHTML = Html;

function viewDetail(bv){
    index = indexerList.indexOf(bv);

    clip = parseInt(mainJson[index]["clip"]);
    month = mainJson[index]["date"].split("-")[0];
    srt = "";
    if(month.length===1){month="0"+month}
    if(clip===1){
        srt = getData("https://cdn.jsdelivr.net/gh/peterpei1186861238/ASDB@"+build+"/db/2021/"+month+"/srt/"+bv+".srt");
    }else{
        for(var i =1;i<clip+1;i++){
            srt =srt + getData("https://cdn.jsdelivr.net/gh/peterpei1186861238/ASDB@"+build+"/db/2021/"+month+"/srt/"+bv+"-"+i.toString()+".srt");
        }
    }
    //srt.replace(/((?=[\x21-\x7e]+)[^A-Za-z0-9])/,"");
    srt.replace(/[0-9]/,"");
    out = "";
    for(let n of srt.split("\n")){
        //美化输出
        out=`<tr><th scope="row">🍓</th><th scope="row">${n}</th></tr>${out}`;
    }
    html = `<table class="table"><thead><tr><th scope="col">#</th><th scope="col">文本</th></tr></thead><tbody>${out}</tbody></table>`;
    document.getElementById(bv+"-Content").innerHTML = html;
}

function getData(url){
    //通过XMLHttpRequest获取cdn中的版本,同步阻塞式
    var xhr = new XMLHttpRequest();
    xhr.open("GET",url,false);
    xhr.send(null);
    try{r = xhr.responseText;}catch(e){r = "error http"}finally{return r}
}