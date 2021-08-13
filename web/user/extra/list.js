let toolsMap = new Map([
    [0,"tools-staff"],
    [1,"tools-scene"],
    [2,"tools-type"],
    [3,"tools-skin"],
    [4,"tools-platform"]
]);
var fliter = {
    "staff":[],
    "scene":[],
    "skin":[],
    "type":[],
    "platform":[]
}
let stafflistAvator = new Map([
    ["A",["https://i0.hdslb.com/bfs/face/566078c52b408571d8ae5e3bcdf57b2283024c27.jpg","Ava"]],
    ["B",["https://i2.hdslb.com/bfs/face/668af440f8a8065743d3fa79cfa8f017905d0065.jpg","Bella"]],
    ["C",["https://i1.hdslb.com/bfs/face/a7fea00016a8d3ffb015b6ed8647cc3ed89cbc63.jpg","Carol"]],
    ["D",["https://i2.hdslb.com/bfs/face/d399d6f5cf7943a996ae96999ba3e6ae2a2988de.jpg","Diana"]],
    ["E",["https://i1.hdslb.com/bfs/face/8895c87082beba1355ea4bc7f91f2786ef49e354.jpg","Ellen"]],
    ["F",["https://i2.hdslb.com/bfs/face/f8af62422492758d3377b185869dd69a3bb0c188.jpg","Furry"]]
]);
var targetJson = {}
var thumbalJson = new Map();
//筛选索引

//获取信息
function jsons(){

    function getJson(url)
    {
        var xhr = new XMLHttpRequest();
        xhr.open("GET",url,false);
        xhr.send(null);
        var jsonData = JSON.parse(xhr.responseText);
        return jsonData;
    }
    function compareList(list1,list2){
        //Judge if element in list1 exsistes in list2
        var judge = false;
        for (var item1 in list1){     
            if(list2.indexOf(list1[item1])>-1){
                judge=true;
                break;
            }
            if(list2.indexOf(list1[item1][0])>-1){
                //For skin
                judge=true;
                break;
            }
        }
        return judge;
    }
    function makeStaffChip(staffList){
        //Make chiplist for next gen
        var staffchip = "";
        for(let a in staffList){
            staffchip = `${staffchip}<div class="mdui-chip"><img class="mdui-chip-icon"src="${stafflistAvator.get(staffList[a])[0]}"/><span class="mdui-chip-title">${stafflistAvator.get(staffList[a])[1]}</span></div>`;
        }
        //<h6>Activity</h6><div class="mdui-chip"onclick="  mdui.snackbar({message: 'Such Art 32:59 \n Game2 33:10'});"><span class="mdui-chip-icon"><i class="mdui-icon material-icons">videogame_asset</i></span><span class="mdui-chip-title">Game</span></div><div class="mdui-chip"><span class="mdui-chip-icon"><i class="mdui-icon material-icons">mic</i></span><span class="mdui-chip-title">Song</span></div><div class="mdui-chip"><span class="mdui-chip-icon"><i class="mdui-icon material-icons">group</i></span><span class="mdui-chip-title">Chat</span></div><div class="mdui-chip"><span class="mdui-chip-icon"><i class="mdui-icon material-icons">directions_walk</i></span><span class="mdui-chip-title">Dance</span></div>
        return staffchip;
    }
    function initJson(){
        if(!Object.keys(targetJson).length){targetJson =getJson("https://cdn.jsdelivr.net/gh/peterpei1186861238/ASDB@Release/db/2021/main.json");}
        if(!Object.keys(thumbalJson).length){thumbalJson =getJson("https://cdn.jsdelivr.net/gh/peterpei1186861238/ASDB@Release/db/2021/Cover.json");}
        //Archive for https://cdn.jsdelivr.net/gh/peterpei1186861238/ASDB@V1.0/db/2021/main.json
        //Update for https://asdb.live/db/2021/main.json
        //列出

        var list = "";
        var crossJudge = true;
        for (var attr in targetJson){
            //筛选
            for (let item of toolsMap.entries()){
                if(!compareList(targetJson[attr][item.toString().split("-")[1]],fliter[item.toString().split("-")[1]])){crossJudge=false;}
            }
            if (!crossJudge){crossJudge=true;continue;}
            var bv = targetJson[attr]["bv"]
            //list = `<div id="${bv}"class="mdui-col"><div class="mdui-card" style="border-radius: 10px;"><div class="mdui-card-media"><img src="${thumbalJson[bv]}" style="height:13vw;object-fit: cover;" /><div class="mdui-card-media-covered mdui-card-media-covered-top"><div class="mdui-card-primary"><div class="mdui-card-primary-title">${targetJson[attr]["title"]}</div></div></div></div><div class="mdui-card-actions">${makeStaffChip(targetJson[attr]["staff"])}<div class="mdui-table-fluid"><table class="mdui-table"><thead><tr><th>${targetJson[attr]["date"]} ${targetJson[attr]["time"]}</th><th><a href="https://www.bilibili.com/${bv}"target="_blank">${bv}</a></th></tr></thead></table></div></div></div></div>${list}`;
            list = `<div id="${bv}" class="mdui-col mdui-shadow-10" style="transition: all 1s ease-in 1s; "><div class="mdui-card" style="border-radius: 10px;"><div class="mdui-card-media"><img src="${thumbalJson[bv]}"></div><div class="mdui-panel" style="border-radius: 10px;" mdui-panel><div class="mdui-panel-item"><div class="mdui-panel-item-header">${targetJson[attr]["title"]}<i class="mdui-panel-item-arrow mdui-icon material-icons">keyboard_arrow_down</i></div><div class="mdui-panel-item-body">${makeStaffChip(targetJson[attr]["staff"])}<table class="mdui-table"><thead><tr><th>${targetJson[attr]["date"]} ${targetJson[attr]["time"]}</th><th><a href="https://www.bilibili.com/${bv}" target="_blank">${bv}</a></th></tr></thead></table></div></div></div></div></div>${list}`;
        }
        document.getElementById('main').innerHTML = list;
        //去除dialog
        if (opened){inst.close();opened=false;}
    }
    initJson();
}

function filter(){
    //Get Checked
    fliter = {
        "staff":[],
        "scene":[],
        "skin":[],
        "type":[],
        "platform":[]
    }
    function Checked(child){
        if(document.getElementById(child).children[0].checked){
            fliter[child.split("-")[1]].push(child.split("-")[2]);
            //赋值
        }
    }
    for(let attr of toolsMap.values()){
        var child = document.getElementById(attr).firstChild;
        var last = document.getElementById(attr).lastChild;
        while(child!=last){
            Checked(child.id);
            child = child.nextSibling;
        }
        Checked(last.id);
    }
    //比对并整理
    jsons();
}

////////UI//////////
function tools(){
    let staff = new Map([
        [0,["A","Ava"]],
        [1,["B","Bella"]],
        [2,["C","Carol"]],
        [3,["D","Diana"]],
        [4,["E","Ellen"]],
        [5,["F","Furry"]]
    ]);
    var list = "";
    for(let value of staff.values() ){
        list = `${list}<label class="mdui-checkbox" id="tools-staff-${value[0]}"><input type="checkbox" checked/><i class="mdui-checkbox-icon"></i>${value[1]}</label>`
    }

    document.getElementById('tools-staff').innerHTML = list;
    let scene = new Map([
        [0,["classroom"]],
        [1,["beach"]],
        [2,["zhijiang"]],
        [3,["domroom"]],
        [4,["gameroom"]],
        [5,["show"]],
        [6,["singroom"]],
        [7,["filmstudio"]],
        [8,["rooftop"]],
        [9,["Aroom"]],
        [10,["Broom"]],
        [11,["Croom"]],
        [12,["Droom"]],
        [13,["Eroom"]],
        [14,["christmas"]],
        [15,["liveroom"]]
    ]);
    list = "";
    for(let value of scene.values() ){
        list = `${list}<label class="mdui-checkbox" id="tools-scene-${value[0]}"><input type="checkbox" checked/><i class="mdui-checkbox-icon"></i>${value[0]}</label>`
    }
    document.getElementById('tools-scene').innerHTML = list;
    let activit = new Map([
        [0,["game","游戏(泛指)"]],
        [1,["theater","小剧场"]],
        [2,["chat","闲聊"]],
        [3,["song","唱歌"]],
        [4,["dance","跳舞"]],
        [5,["vertical","竖屏"]]
    ]);
    list = "";
    for(let value of activit.values() ){
        list = `${list}<label class="mdui-checkbox" id="tools-type-${value[0]}"><input type="checkbox" checked/><i class="mdui-checkbox-icon"></i>${value[1]}</label>`
    }
    document.getElementById('tools-type').innerHTML = list;
    let skin = new Map([
        [0,["official","官方"]],
        [1,["year","新年"]],
        [2,["sleep","睡衣"]],
        [3,["group","团服"]],
        [4,["birthday","生日装扮"]],
        [5,["sport","(拉姐)运动装"]],
        [6,["christmas","圣诞节装扮"]]
    ]);
    list = "";
    for(let value of skin.values() ){
        list = `${list}<label class="mdui-checkbox" id="tools-skin-${value[0]}"><input type="checkbox" checked/><i class="mdui-checkbox-icon"></i>${value[1]}</label>`
    }
    document.getElementById('tools-skin').innerHTML = list;
    let platform = new Map([
        [0,["B","B站"]],
        [1,["D","抖音"]]
    ]);
    list = "";
    for(let value of platform.values() ){
        list = `${list}<label class="mdui-checkbox" id="tools-platform-${value[0]}"><input type="checkbox" checked/><i class="mdui-checkbox-icon"></i>${value[1]}</label>`
    }
    document.getElementById('tools-platform').innerHTML = list;
}