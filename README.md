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

|   名字  |  Ava向晚   | Bella贝拉    |  Carol珈乐   | Diana嘉然    |  Eileen乃琳   | 
| --- | --- | --- | --- | --- | --- | 
|  个人主页(BiliBili)   |  [向晚大魔王](https://space.bilibili.com/672346917 "向晚大魔王")![](https://i0.hdslb.com/bfs/face/566078c52b408571d8ae5e3bcdf57b2283024c27.jpg)   |   [贝拉Kira ](https://space.bilibili.com/672353429/ "贝拉Kira ") ![](https://i2.hdslb.com/bfs/face/668af440f8a8065743d3fa79cfa8f017905d0065.jpg) |  [珈乐Carol ](https://space.bilibili.com/351609538/ "珈乐Carol ")![](https://i2.hdslb.com/bfs/face/a7fea00016a8d3ffb015b6ed8647cc3ed89cbc63.jpg)  |  [嘉然今天吃什么](https://space.bilibili.com/672328094/ "嘉然今天吃什么") ![](https://i2.hdslb.com/bfs/face/d399d6f5cf7943a996ae96999ba3e6ae2a2988de.jpg)  |   [乃琳Queen](https://space.bilibili.com/672342685/ "乃琳Queen")  ![](https://i1.hdslb.com/bfs/face/8895c87082beba1355ea4bc7f91f2786ef49e354.jpg)|   


#### 目录结构
```
db --- 存放数据库文件
    main.json --- json格式的信息
    search.json --- 简单索引(含字幕)
    /srt --- 字幕文件
    /schedule --- 直播QA
    /timeline --- 时间轴(第三方 感谢@贼眉鼠眼小珈乐 打的轴) 
    /danmaku --- 直播弹幕的Json文件
web --- 前端网页和js文件
tool --- 数据的处理
make-front-end --- 前端的react源码
```
#### 更新日志
###### 2021-09-11
🩹 修复 大小写非敏感搜索 <br>
➕ 新增 时间轴直接跳转 <br>

#### 更新数据库
具体请参考[保持数据库最新](https://github.com/peterpei1186861238/A-Soul-Database/tree/main/tools/getAsdb "保持数据库最新")

#### 编译前端源码
    编译在Ubuntu20.04LTS以及Windows10下均通过
    node版本:10.19.0
    npm版本:6.14.4
    python3版本: 3.8.10

安装node与npm:

* Windows:
    * 安装教程: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

* Linux:
    * 安装教程：
        ```console
        $ sudo apt install nodejs
        $ sudo apt install npm 
        ```

编译:

* 首次：
    ```console
    ~$ cd A-Soul-Database/
    ~/A-Soul-Database$ npm install cnpm -g
    ~/A-Soul-Database$ cd make-front-end/
    ~/A-Soul-Database/make-front-end$ cnpm install
    ~/A-Soul-Database/make-front-end$ cnpm install react-highlight-words
    ~/A-Soul-Database/make-front-end$ cnpm run build
    ```
* 非首次：
    ```console
    ~$ cd A-Soul-Database/make-front-end/
    ~/A-Soul-Database/make-front-end$ cnpm run build
    ```
(上面的所有cnpm命令都可以用npm替代，但由于境内网络特殊性可能会导致失败或延迟过高)

成功之后，静态的网页文件会生成在 A-Soul-Database/web/目录下

可以在A-Soul-Database/make-front-end/config/config.js中的outputPath修改静态文件生成路径

本地测试:

首次编译成功之后，可以将网页运行在localhost或服务器上
```console
~$ cd A-Soul-Database/make-front-end/
~/A-Soul-Database/make-front-end$ cnpm start
```
默认端口为8000

<b>由于CDN拦截跨域请求，故在本地运行时时请把 `public/js/basic.js` 中的 `urlChoice` 改为 1,修改完成之后请将其改回0再push</b>
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
