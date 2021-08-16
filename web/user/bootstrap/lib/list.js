//Js for list.html
//创建全局变量
var fliterJson = {};
var SceneMap = {"show":"展台","domroom":"客厅","spaceship":"太空船","ktv":"ktv","sky":"天空湖","Eroom":"乃琳房间","Aroom":"向晚房间","Droom":"嘉然房间","rooftop":"天台","beach":"海滩","classroom":"教室","singroom":"录音室","danceroom":"练舞房","filmstudio":"摄影棚"};
var skinMap = {"swim":"泳装","official":"官方","sport":"运动服(贝拉)","chinese":"古风旗袍(嘉然)","group":"团服","birthday":"生日会服装","sleep":"睡衣","christmas":"圣诞服","year":"新年装"};
var toolMap = ["staff","skin","scene","platform","type"];

function toolkit(){
    //创建toolbar
    let toolkit = new Map([
        //[number,[[id,name],[[options,name]]]]
        [0,[["staff","出镜人物"],[["A","向晚"],["B","贝拉"],["C","珈乐"],["D","嘉然"],["E","乃琳"],["F","阿草"]]]],[1,[["scene","出场场景"],[["classroom","教室"],["beach","海滩"],["domroom","客厅"],["show","舞台"],["singroom","录音室"],["filmstudio","摄影棚"],["rooftop","天台"],["Aroom","向晚房间"],["Droom","嘉然房间"],["Eroom","乃琳房间"],["sky","天空湖"],["danceroom","练舞房"],["ktv","ktv"],["spaceship","太空船"]]]],[2,[["type","活动"],[["song","唱歌"],["dance","跳舞"],["game","游戏"],["chat","闲聊"],["theater","小剧场"],["birthday","生日会"],["vertical","竖屏"]]]],[3,[["skin","服饰"],[["official","设定服装"],["group","团服"],["year","新年服装"],["christmas","圣诞装饰"],["sleep","睡衣"],["birthday","生日会服装"],["chinese","古风旗袍(嘉然限定)"],["sport","运动服(贝拉限定)"],["swim","泳装"]]]],[4,[["platform","平台"],[["B","B站"],["D","抖音"]]]]
    ]);

    for (let item of toolkit.values()){
        var list = "";
        var options = "";
        info = item[0];
        for (let option of item[1]){
            //遍历获得选项
            options = `<div class="form-check form-check-inline"><input class="form-check-input" type="checkbox" id="${info[0]}-${option[0]}" value="${option[0]}" checked/><label class="form-check-label" for="${info[0]}-${option[0]}">${option[1]}</label></div>${options}`;
        }
        list = `<div class="accordion-item"><h2 class="accordion-header" id="tool-${info[0]}-head"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#tool-${info[0]}" aria-expanded="false" aria-controls="tool-${info[0]}">${info[1]}</button></h2><div id="tool-${info[0]}" class="accordion-collapse collapse" aria-labelledby="tool-${info[0]}-head" data-bs-parent="#toolkit"><div class="accordion-body">${options}</div></div></div>${list}`;
        document.getElementById('toolkit').innerHTML += list;
    }
}
function fliter(method){
    //条件筛选 method = "reset"/"其他" 直接隐藏对应结点就好了
    
    for(let n of toolMap){
        var child = document.getElementById("tool-"+n).childNodes[0].firstChild;
        var last = document.getElementById("tool-"+n).childNodes[0].lastChild;
        while(child!=last){
            if(method==="reset"){
                child.firstChild.checked=true;
            }else{
                fliterJson[child.firstChild.id] = child.firstChild.checked;
            }
            child = child.nextSibling;
        }
        if(method==="reset"){
            last.firstChild.checked=true;
            
            //最后调用
        }else{
            fliterJson[last.firstChild.id] = last.firstChild.checked;
            
        }
    }
    if(method==="reset"){
        clearList();
    }else{
        makeFliter();
    }
    setTimeout(function(){LoadingModal.toggle()},1000);
        //刷新list
    function clearList(){
        //清除筛选
        fliterJson={};
        for(let n of document.getElementById("mainList").childNodes){
            n.style="display:block;"
        }
    }
    function makeFliter(){
        for(let n of mainJson){
            bv = n["bv"];
            /*
            比较激进的算法嘞...
            for(let m of n["type"]){
                if(!fliterJson["type-"+m]){document.getElementById(bv+"Card").style="display:none;"}
            }
            */
           //温和点
            for(let k of toolMap){melt(k,n);}
        }
    }
    function melt(keyword,n){
        //温和搜索,渲染也做了
        check = false;
        if(keyword==="skin"){
            for(let m of n["staff"]){
                if(m==="F"){continue}
                for(let z of n["skin"][m]){
                    if(fliterJson[keyword+"-"+z]){check=true;break;}
                }
            }
        }else{
            for(let m of n[keyword]){
                if(fliterJson[keyword+"-"+m]){check=true;break;}
            }
        }
        if(!check){document.getElementById(bv+"Card").style="display:none;"}
        return check;
    }
}


function makeList(){
    //创建列表
    activityArray = {"song":"🎤","chat":"💬","game":"🎮️","birthday":"🎂","theater":"🎬","dance":"💃","vertical":"📱"};
    avator = {"A":"https://i0.hdslb.com/bfs/face/566078c52b408571d8ae5e3bcdf57b2283024c27.jpg","B":"https://i2.hdslb.com/bfs/face/668af440f8a8065743d3fa79cfa8f017905d0065.jpg","C":"https://i1.hdslb.com/bfs/face/a7fea00016a8d3ffb015b6ed8647cc3ed89cbc63.jpg","D":"https://i2.hdslb.com/bfs/face/d399d6f5cf7943a996ae96999ba3e6ae2a2988de.jpg","E":"https://i1.hdslb.com/bfs/face/8895c87082beba1355ea4bc7f91f2786ef49e354.jpg","F":"https://i2.hdslb.com/bfs/face/f8af62422492758d3377b185869dd69a3bb0c188.jpg"};
    if(!Object.keys(mainJson).length){mainJson=getJsonData("https://cdn.jsdelivr.net/gh/peterpei1186861238/ASDB@"+build+"/db/2021/main.json")}
    if(!Object.keys(CoverJson).length){CoverJson=getJsonData("https://cdn.jsdelivr.net/gh/peterpei1186861238/ASDB@"+build+"/db/2021/Cover.json")}
    Html = "";
    typ = ["🎤","💃"];
    for(let attr of mainJson){
        avatorHtml = "";
        activityHtml = "";
        sceneHtml = "";
        tagHtml = "";
        gameHtml = "";
        tableAvatorHtml="";
        skinHtml="";
        bv = attr["bv"];
        title = attr["title"];
        staff = attr["staff"];
        activity = attr["type"];
        scene = attr["scene"];
        skin = attr["skin"];
        platform = attr["platform"];
        cover = CoverJson[bv];
        for (let item of staff){
            avatorHtml=`${avatorHtml}<img class="avator" src="${avator[item]}">`;
            if(item==="F"){continue;}
            skinHtml = `${skinHtml}<tr><td><img class="avator" style="width:2rem;" src="${avator[item]}"></td><td>`;
            for(let n of skin[item]){
                skinHtml=`${skinHtml} ${skinMap[n]}`;
            }
            skinHtml = `${skinHtml}</td></tr>`;
        }
        for(let item of activity){
            activityHtml+=activityArray[item]+" ";
        }
        for(let item of scene){
            sceneHtml = `${SceneMap[item]} ${sceneHtml}`;
        }
        for(let item of attr["tags"]){
            tagHtml = `${tagHtml}.${item}`;
        }

        for(let item of attr["items"][0]["item"]){
            gameHtml = `<tr><td>${item[1]}</td><td>🎮️${item[0]}🎮️</td></tr>${gameHtml}`;
        }
        for(var i of [1,2]){
            if(Object.keys(attr["items"][i]["item"]).length){
                for(let item of attr["items"][i]["item"]){
                    for(let ite of item[2]){tableAvatorHtml=`${tableAvatorHtml}<img class="avator" style="width:2rem;" src="${avator[ite]}" class="card-img-top">`}
                    gameHtml = `<tr><td>${item[1]}</td><td>${typ[i-1]}${item[0]}${typ[i-1]}</td><td>${tableAvatorHtml}</td></tr>${gameHtml}`;
                    tableAvatorHtml="";
                }
            }
        }
        content = `BV号: <a target="_blank" href="https://www.bilibili.com/${bv}" style="color:#BD7D74">${bv}</a></br>日期: <b style="color:#9AC8E2">${attr["date"]} ${attr["time"]}</b></br>场景: <b style="color:#E799B0">${sceneHtml}</b></br>服饰: <table class="table"><thead><tr><th scope="col">出镜人物</th><th scope="col">服饰</th></tr></thead><tbody>${skinHtml}</tbody></table></br><table class="table"><thead><tr><th scope="col">时间</th><th scope="col">活动</th><th scope="col">出镜人物</th></tr></thead><tbody>${gameHtml}</tbody></table></br>关键词: <code>${tagHtml}</code>`;
        Html = `<div class="col" id="${bv}Card"><div class="card"><img src="${cover}" style="height: 13vw;object-fit: cover;" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">${title}</h5><div class="card-text">${avatorHtml}<span class="badge bg-secondary">${activityHtml}</span></div><button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#modal-${bv}"><i class="fas fa-info"></i></button><div class="modal fade" id="modal-${bv}" tabindex="-1" aria-labelledby="modal-${bv}-content" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="modal-${bv}-content">${title}</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">${content}</div></div></div></div></div></div></div>${Html}`;
    }
    document.getElementById("mainList").innerHTML = Html;
    //关闭加载框
    setTimeout(function(){LoadingModal.toggle()},1000);
    
    if(getName("bv")){
        var getModel = new bootstrap.Modal(document.getElementById("modal-"+bv));
        getModel.toggle();
    }
}

function getName(name) {
    //获取get值
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
    }
function init(){
    //初始化
    LoadingBarListenser();
}
init();
    