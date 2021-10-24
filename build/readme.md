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
    ~$ cd A-Soul-Database/builds
    ~/A-Soul-Database$ npm install cnpm -g
    ~/A-Soul-Database$ cd make-front-end/
    ~/A-Soul-Database/make-front-end$ cnpm install
    ~/A-Soul-Database/make-front-end$ cnpm install react-highlight-words
    ~/A-Soul-Database/make-front-end$ cnpm run build
    ```
* 非首次：
    ```console
    ~$ cd A-Soul-Database/builds/make-front-end/
    ~/A-Soul-Database/builds/make-front-end$ cnpm run build
    ```
(上面的所有cnpm命令都可以用npm替代，但由于境内网络特殊性可能会导致失败或延迟过高)

成功之后，静态的网页文件会生成在 A-Soul-Database/web/目录下

可以在A-Soul-Database/builds/make-front-end/config/config.js中的outputPath修改静态文件生成路径

本地测试:

首次编译成功之后，可以将网页运行在localhost或服务器上
```console
~$ cd A-Soul-Database/builds/make-front-end/
~/A-Soul-Database/builds/make-front-end$ cnpm start
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
