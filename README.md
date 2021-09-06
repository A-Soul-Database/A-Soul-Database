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
    /danmaku --- 直播弹幕的Json文件
web --- 前端网页和js文件
tool --- 数据的处理
make-front-end --- 前端的react源码
```
#### 更新日志
###### 2021-09-02
🩹 修复 `Tag.py` 的逻辑问题 <br>
🩹 修复 `srtChange.py` 的逻辑问题，现在人名终于能搜索到了🧎🙇 <br>

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

由于CDN拦截跨域请求，故在编译时请把 `public/js/basic.js` 中的 `urlChoice` 改为 1

成功之后，静态的网页文件会生成在 A-Soul-Database/web/目录下

可以在A-Soul-Database/make-front-end/config/config.js中的outputPath修改静态文件生成路径

本地测试:

首次编译成功之后，可以将网页运行在localhost或服务器上
```console
~$ cd A-Soul-Database/make-front-end/
~/A-Soul-Database/make-front-end$ cnpm start
```
默认端口为8000
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
