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
var targetJson = {}
//筛选索引

//Get Json 
function jsons(){

    function getJson(url)
    {
        var xhr = new XMLHttpRequest();
        xhr.open("GET",url,false);
        xhr.send(null);
        var jsonData = JSON.parse(xhr.responseText);
        targetJson = jsonData;
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
    function initJson(){
        if(!Object.keys(targetJson).length){getJson("https://cdn.jsdelivr.net/gh/peterpei1186861238/ASDB@main/db/2021/main.json");}
        //列出
        var list = "";
        for (var attr in targetJson ){
            if(!compareList(targetJson[attr]["type"],fliter["type"])){continue}
            if(!compareList(targetJson[attr]["scene"],fliter["scene"])){continue}
            if(!compareList(targetJson[attr]["staff"],fliter["staff"])){continue}
            if(!compareList(targetJson[attr]["skin"],fliter["skin"])){continue}
            if(!compareList(targetJson[attr]["platform"],fliter["platform"])){continue}
            list = `${list}<div class="mdui-panel-item"><div class="mdui-panel-item-header">${targetJson[attr]["title"]}</div><div class="mdui-list-item-body" id="list-item-${targetJson[attr]["bv"]}"></div></div>`
        }
        document.getElementById('listItem').innerHTML = list;
        
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
        [3,["group","团服"]]
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