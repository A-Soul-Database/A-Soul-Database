//var mainJson = {};
var searchJson = {};
var KeyWord = "";
function search(){
    //搜索功能  
    //if(!Object.keys(mainJson).length){mainJson=JSON.parse(getData("https://cdn.jsdelivr.net/gh/peterpei1186861238/ASDB@"+build+"/db/2021/main.json"))};
    if(!Object.keys(searchJson).length){searchJson=JSON.parse(getData("https://cdn.jsdelivr.net/gh/peterpei1186861238/ASDB@"+build+"/db/2021/search.json"))};
    function getData(url){
        //通过XMLHttpRequest获取cdn中的版本,同步阻塞式
        var xhr = new XMLHttpRequest();
        xhr.open("GET",url,false);
        xhr.send(null);
        try{r = JSON.parse(xhr.responseText);}catch(e){r = {"title":"error"}}finally{return r}
    }
    KeyWord = document.getElementById("searchText").value;
    index = "";
    for(let n of searchJson){
        bv = n[0];
        content = n[1];
        result = content.indexOf(KeyWord);
        console.log(result);
    }
}
search();