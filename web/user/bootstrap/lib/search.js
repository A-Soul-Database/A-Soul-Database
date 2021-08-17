var searchJson = {};
var KeyWord = "";
var searchResult = {
    "title":[],
    "srt":[],
    "activity":[],
    "tags":[]
};
var singleBvRsult = new Array();

if(!Object.keys(mainJson).length){mainJson=getJsonData("https://cdn.jsdelivr.net/gh/peterpei1186861238/ASDB@"+build+"/db/2021/main.json")};
if(!Object.keys(searchJson).length){searchJson=getJsonData("https://cdn.jsdelivr.net/gh/peterpei1186861238/ASDB@"+build+"/db/2021/search.json")};
if(!Object.keys(CoverJson).length){CoverJson=getJsonData("https://cdn.jsdelivr.net/gh/peterpei1186861238/ASDB@"+build+"/db/2021/Cover.json")}
if(!Object.keys(indexerList).length){indexerList=getJsonData("https://cdn.jsdelivr.net/gh/peterpei1186861238/ASDB@"+build+"/db/2021/indexer.json")}
function search(){
    //搜索功能  
    function getSelected(name){
        //获取筛选
        child = document.getElementById(name).children;
        for(let d of child){
            if(d.selected){
                activValue = d.value;
                break;
            }
        }
        return activValue;
    }

    typ = getSelected("typeSearch");
    dat = getSelected("searchdate");
    if(!dat==="0"){
        if(dat.length===1){dat="0"+dat}
        console.log(dat)
        giveJson = getJsonData("https://cdn.jsdelivr.net/gh/peterpei1186861238/ASDB@"+build+"/db/2021/"+dat+"/main.json");
        
    }else{
        giveJson=mainJson;
    }

    //先拿一下两个筛选框的数据
    document.getElementById("mainList").innerHTML="";
    KeyWord = document.getElementById("searchText").value;

    function searchCore(content,KeyWord){
        result = [];
        var position = content.indexOf(KeyWord);
        while(position>-1){
            searchResultBool = true;
            HavIndexCount = 1;
            result.push(position);
            position = content.indexOf(KeyWord,position+1);
        }
        return result;
    }

    index = "";
    HavIndexCount = 0;
    Html = "";
    for(let n of giveJson){
        if(KeyWord.length===0){break}
        searchResultBool = false;
        content = "";
        bv = n["bv"];
        title = searchJson[bv]["title"];
        if(typ==="title"){
            content = title;
            searchResult[typ] = searchCore(content,KeyWord);
        }else if(typ==="srt"){
            content = searchJson[bv]["srt"];
            searchResult[typ] = searchCore(content,KeyWord);
        }else if (typ==="activity"){
            content = searchJson[bv]["type"];
            searchResult[typ] = searchCore(content,KeyWord);
        }else if(typ==="tags"){
            content = searchJson[bv]["tags"];
            searchResult[typ] = searchCore(content,KeyWord);
        }else{
            var items = ["title","srt","type","tags"];
            for (let e of items){
                searchResult[e] = searchCore(searchJson[bv][e],KeyWord);
            }
        }
        if(searchResultBool){
            HavIndexCount = 1;
                srtPlace = "";
                typePlace = "";
                tagPlace = "";
                cover = CoverJson[bv];
                try{
                for(let m of searchResult["srt"]){
                    if(m===-1){srtPlace=''}else{
                        srtPlace =`${srtPlace}<tr><th scope="row">#</th><td>...${searchJson[bv]["srt"].substring(m-10,m-1)}🌟<b style="color:#9AC8E2;">${searchJson[bv]["srt"].substring(m,m+Object.keys(KeyWord).length)}</b>🌟${searchJson[bv]["srt"].substring(m+Object.keys(KeyWord).length,m+Object.keys(KeyWord).length+20)}...</td></tr>`;
                    }
                }
                for(let n of searchResult["type"]){
                    if(n===-1){typePlace="没有结果捏"}else{
                        typePlace=`${typePlace}   ${searchJson[bv]["type"].substring(n-10,n-1)}🌄<b style="color:#BD7D74;">${searchJson[bv]["type"].substring(n,n+Object.keys(KeyWord).length)}</b>🌇${searchJson[bv]["type"].substring(n+Object.keys(KeyWord).length,n+Object.keys(KeyWord).length+20)}`;
                    }
                }
                for(let n of searchResult["tags"]){
                    if(n===-1){tagPlace="没有结果捏"}else{
                        tagPlace=`${tagPlace}   ${searchJson[bv]["tags"].substring(n-10,n-1)}🐱<b style="color:#576690;">${searchJson[bv]["tags"].substring(n,n+Object.keys(KeyWord).length)}</b>🐭${searchJson[bv]["tags"].substring(n+Object.keys(KeyWord).length,n+Object.keys(KeyWord).length+20)}`;
                    }
                }
            }catch(e){}finally{}
                searchModalContent = `<a target="_blank"  href="./list.html?bv=${bv}">查看详情</a></br>BV号: <code><a target="_blank" href="https://www.bilibili.com/${bv}">${bv}</a></code></br>活动搜索结果🔎: ${typePlace}</br>关键词搜索结果🔬: ${tagPlace}</br><table class="table"><thead><tr><th scope="col">#</th><th scope="col">字幕搜索结果🔭</th></tr></thead><tbody>${srtPlace}</tbody></table>`;
                Html = `<div class="col"><div class="card"><img src="${cover}" style="height: 13vw;object-fit: cover;" class="card-img-top"><div class="card-body"><h5 class="card-title">🔎${title}</h5><button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#modal-${bv}"><i class="fas fa-info"></i></button><div class="modal fade" id="modal-${bv}" tabindex="-1" aria-labelledby="modal-${bv}-content" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="modal-${bv}-content">${title}</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">${searchModalContent}</div></div></div></div></div></div></div>${Html}`;
        }
        searchResult = {};
    }
        if (!HavIndexCount){
            Html = "<div style='height:30vw;text-aligen:center;margin:auto;transform: translate(0, -50%);position: absolute;top:50%;transform: translateX(-50%);left:50%;'><img src='https://i0.hdslb.com/bfs/article/278b26337e1379feb0fc431e2c05e8e2c22e2a21.gif' style='height:20vw;;text-align: center;'><h4>没有搜索结果/关键词为空捏😢,换一个试试吧</h4></div>";
        }
    document.getElementById("mainList").innerHTML = Html;
    content = "";
    setTimeout(function(){LoadingModal.toggle()},1000);
    //本次搜索结束

}

//search();