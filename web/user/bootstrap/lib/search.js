var searchJson = {};
var KeyWord = "";
var searchResult = new Array();
var singleBvRsult = new Array();

if(!Object.keys(mainJson).length){mainJson=getJsonData("https://cdn.jsdelivr.net/gh/peterpei1186861238/ASDB@"+build+"/db/2021/main.json")};
if(!Object.keys(searchJson).length){searchJson=getJsonData("https://cdn.jsdelivr.net/gh/peterpei1186861238/ASDB@"+build+"/db/2021/search.json")};
if(!Object.keys(CoverJson).length){CoverJson=getJsonData("https://cdn.jsdelivr.net/gh/peterpei1186861238/ASDB@"+build+"/db/2021/Cover.json")}
if(!Object.keys(indexerList).length){indexerList=getJsonData("https://cdn.jsdelivr.net/gh/peterpei1186861238/ASDB@"+build+"/db/2021/indexer.json")}
function search(){
    //搜索功能  

    KeyWord = document.getElementById("searchText").value;
    index = "";
    for(let n of mainJson){
        bv = n["bv"];
        content = searchJson[bv];
        var position = content.indexOf(KeyWord);
        while(position>-1){
            singleBvRsult.push(position);
            position = content.indexOf(KeyWord,position+1);
        }
        if (Object.keys(singleBvRsult).length){
            searchResult.push([bv,singleBvRsult]);
            singleBvRsult = [];
        }
    }
    SearchList();
    function SearchList(){
        if(Object.keys(searchResult).length){
            Html = "";
            for (let n of searchResult){
                bv = n[0];
                resultlist = n[1];
                detail = mainJson[indexerList.indexOf(bv)];
                title = detail["title"];
                cover = CoverJson[bv];
                for(let m of resultlist){
                    content = searchJson[bv];
                    keyplace =keyplace+"\n"+ content.substring(m,m+100);
                    //console.log(bv,keyplace);
                }
                Html = `<div class="col"><div class="card"><img src="${cover}" style="height: 13vw;object-fit: cover;" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">${title}</h5><button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#modal-${bv}"><i class="fas fa-info"></i></button><div class="modal fade" id="modal-${bv}" tabindex="-1" aria-labelledby="modal-${bv}-content" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="modal-${bv}-content">${title}</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">${keyplace}</div></div></div></div></div></div></div>${Html}`;
            }
        }else{
            console.log("none");
        }
        searchResult = [];
        setTimeout(function(){LoadingModal.toggle()},1000);
        //本次搜索结束
    }
}

//search();