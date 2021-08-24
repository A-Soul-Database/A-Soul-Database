## [asdb](https://asdb.live) -- A-SOUL Live Clip Database  A-SOUL 非官方直播数据库 

#### 简介
A-Soul 简介

A-SOUL是乐华娱乐于2020年11月23日公开的其旗下首个虚拟偶像团体，由5名成员组成。

A-SOUL主页链接：https://space.bilibili.com/703007996<br>
乃琳：https://space.bilibili.com/672342685<br>
珈乐：https://space.bilibili.com/351609538<br>
嘉然：https://space.bilibili.com/672328094<br>
贝拉：https://space.bilibili.com/672353429<br>
向晚：https://space.bilibili.com/672346917<br>


#### 目录结构
```
db --- 存放数据库文件
    main.json --- json格式的信息
    search.json --- 简单索引(含字幕)
    /srt --- 字幕文件
    /schedule --- 直播QA
    /timeline --- 时间轴(第三方 感谢@贼眉鼠眼小珈乐 打的轴) 
web --- 前端网页和js文件
tool --- 数据的处理
make-front-end --- 前端的react源码
```
#### 进度
已完成：
* 2021年目前所有直播数据的简略时间轴（完整 歌曲，舞蹈）和全部字幕（机器识别）
* 前端列表筛选，查看
* 前端搜索
* 前端字幕检索

未完成：
* 按时间搜索

#### 前端托管
目前本网站托管于 Github Pages 并使用 Vercel CDN 部署&加速，部分由 jsdeliever 加速
