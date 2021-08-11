function bannerPhoto(){
//banner-photo
let img_map = new Map([
    ["A", "http://s2.328888.xyz/2021/08/05/8a3ae274c4926.png"],
    ["B", "http://s2.328888.xyz/2021/08/05/e4d72aece84d2.png"],
    ["C","http://s2.328888.xyz/2021/08/05/020df75ea6a4c.png"],
    ["D","http://s2.328888.xyz/2021/08/05/a919cf81dcfe3.png"],
    ["E","http://s2.328888.xyz/2021/08/05/ef73e9cbabb9c.png"]
]); 

var item = "";

for (let value of img_map.values()){
    item = `${item}<div class="mdui-col">
    <div class="mdui-grid-tile">
      <img src="${value}" alt="official.png" title="official.png" />
      </div>
      </div>`
}
document.getElementById('photo-banner').innerHTML = item;
}
//drawer
function drawer(){
let drawer = new Map([
    ["home",["/web/user/index.html","主页"]],
    ["photo",["/web/user/skin/index.html","皮肤库"]],
    ["info",["/web/user/info/index.html","关于"]]
]);

var item = "";
for (let entry of drawer.entries()){
    item = `
        ${item}                <a href="${entry[1][0]}">
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">${entry[0]}</i>
          <div class="mdui-list-item-content">${entry[1][1]}</div>
        </li>
        </a>
    `
}
document.getElementById('drawer').innerHTML = item;
}
//toolkit
function toolkit(){
    let drawer = new Map([
        [0,["/web/user/search/index.html","pink","搜索"]],
        [1,["/web/user/list/index.html","green","查看所有"]],
        [2,["https://github.com/peterpei1186861238/ASDB","purple","github"]]
    ]);
    
    var item = "";
    for (let value of drawer.values()){
        item = `
            ${item}                <a href="${value[0]}
            " class="mdui-btn mdui-ripple mdui-color-${value[1]}-100" target="_blank" style="margin: 0;text-align: center;">${value[2]}</a>
        `
    }
    document.getElementById('toolkit').innerHTML = item;
}

var opened = false;
var inst = new mdui.Dialog('#dialog');
/*
function loading(method=true){
    //加载对话框
    var inst =new mdui.Dialog('#dialog');
    if (method===true){
        inst.open();
        opened = true;
    }else{
        inst.close();
    }
}
*/