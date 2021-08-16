let bannerPhoto = new Map([
    ["Ava", ["https://z3.ax1x.com/2021/08/13/fDJjDs.png","向晚"]],
    ["Bella", ["https://z3.ax1x.com/2021/08/13/fDYCCT.png","贝拉"]],
    ["Carol",["https://z3.ax1x.com/2021/08/13/fDYEr9.png","珈乐"]],
    ["Diana",["https://z3.ax1x.com/2021/08/13/fDYKPK.png","嘉然"]],
    ["Ellen",["https://z3.ax1x.com/2021/08/13/fDYGqA.png","乃琳"]],
    ["Furry",["https://z3.ax1x.com/2021/08/13/fDYYVI.jpg","阿草©Pixiv 88627183"]]
]); 
var template = "";
for (var item of bannerPhoto.values()){
    template = `${template}<div class="col"><img src="${item[0]}" class="img-fluid" alt="${item[1]}"></div>`;
}
test = document.getElementById('banner-Image').innerHTML=template;

let bannerButton = new Map([
    [0,["./list.html","查看全部","primary"]],
    [1,["./search.html","搜索","success"]],
    [2,["https://github.com/peterpei1186861238/ASDB","Github","info"]]
]);
var template = "";
for (var entry of bannerButton.values()){
    template=`${template}<a href="${entry[0]}" target="_blank"><button type="button" class="btn btn-${entry[2]} btn-lg">${entry[1]}</button></a> `
}
document.getElementById("bannerButton").innerHTML = template;