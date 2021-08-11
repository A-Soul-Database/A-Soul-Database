# [asdb](https://asdb.live)
## ASDB -- A-SOUL Live Clip Database A-SOUL 非官方直播数据库 

# Progress: Finished: 70% web, db in 2021.7 Total:60%, Finish before 2021.8.15

### Useage 使用方法
#### 

### Structures 结构
```
----db
    ----year(e.g.:2020)
        ----weeeks(e.g.:13)
            ----schedule.jpg
            ----main.json
            ----id(01)
                ----main.srt
                ----timeline.txt
```

```
main.json

[{
    "date":"0509",
    "id":01,
    "title":"【A-SOUL游戏室】第七期 5.9 只只大冒险！续集！【直播录像】",
    "scene":"classroom",
    "type":"game",
    "staff":["A","D","E"],
    "source":"BV1BK4y1d7hv",
    "song":["爱乘无限大"],
    "tags":["只只大冒险"]
},{
    "date":"日期",
    "title":"标题",
    "scene":"list 场景，classroom-教室 beach-沙滩 zhijiang-枝江大楼 domroom-客厅 gameroom-游戏室,show-舞台,singroom-录音室,filmstudio-摄影棚,rooftop-天台,Aroom-向晚房间,sky-天空湖,danceroom-舞蹈教室,ktv-ktv,spaceship-Bw展会中的飞船"
    "type":"game-游戏,theater-小剧场,chat-闲聊,song-唱歌,dance-跳舞,vertical-竖屏,birthday-生日会",
    "staff":"list类型，A-ava B-bella C-carol D-Diana E-Ellen F-Furry",
    "source":"BV",
    "song":"list类型，存放歌曲",
    "tags":"list 类型，可以存放例如生日会和名场面的其他标签"
}]

{
    "date":"",
    "time":"",
    "liveRoom":"",
    "bv":"",
    "title":"",
    "scene":[],
    "type":[],
    "staff":[],
    "clip":0,
    "items":[
        {
            "name":"game",
            "item":[

            ]
        },
        {
            "name":"song",
            "item":[
            ]
        },
        {
            "name":"dance",
            "item":[

            ]
        }
    ],
    "skin":{
            "A":["official"],
            "B":["official"],
            "C":["official"],
            "D":["official"],
            "E":["official"]
    },
    "platform":"B",
    "tags":[]
}
```

```
main.srt
使用剪映语音自动转换字幕,并替换常见错误词
```

````
timeline.txt
评论下方的时间线
````
