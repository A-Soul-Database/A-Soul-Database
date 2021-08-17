let bannerPhoto = new Map([
    ["Ava", ["https://i.w3tt.com/2021/08/17/q9uzF.webp","向晚"]],
    ["Bella", ["https://i.w3tt.com/2021/08/17/qjMZl.webp","贝拉"]],
    ["Carol",["https://i.w3tt.com/2021/08/17/q98XD.webp","珈乐"]],
    ["Diana",["https://i.w3tt.com/2021/08/17/qjMZl.webp","嘉然"]],
    ["Ellen",["https://i.w3tt.com/2021/08/17/qjOcg.webp","乃琳"]],
    ["Furry",["https://i.w3tt.com/2021/08/17/q9lcM.webp","阿草©Pixiv 88627183"]]
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
