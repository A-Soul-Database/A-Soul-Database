var build = "V1.17";
var LoadingBarStatus = false;
var CoverJson = {};
var mainJson = {};
var indexerList = [];
function LoadingBarListenser(){
    //谁不想要Asoul的加载进度呢？Bootstrap Modal打开或关闭需要时间,css动画变化可能导致bug
    //该函数位于init()被调用,理论上调用一次即可
    document.getElementById("LoadingBar").addEventListener("shown.bs.modal",function(e){LoadingBarStatus=true;});
    document.getElementById("LoadingBar").addEventListener("hidden.bs.modal",function(e){LoadingBarStatus=false;});
}
function getJsonData(url){
    //通过XMLHttpRequest获取cdn中的版本,同步阻塞式
    var xhr = new XMLHttpRequest();
    xhr.open("GET",url,false);
    xhr.send(null);
    try{r = JSON.parse(xhr.responseText);}catch(e){r = {"title":"error"}}finally{return r}
}