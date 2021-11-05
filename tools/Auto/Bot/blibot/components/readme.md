## 动态Bot

| 名称    | 值    | 
| ------- | -------- | 
| Api地址 | https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/space_history?visitor_uid=0&host_uid=&offset_dynamic_id=|
| B站Id    |                            int                                  |
| offset| 偏移量|
|||
|Json返回值|Json返回值|
|data->has_more|1:更多 0:已经到底|
|code|0:成功获取|
|data->cards|若未到结尾则为12个元素,每个元素均为动态值|
|data->cards->item->desc|uid:发布动态者的uid值(int) repost:转发 view:浏览量 comment:评论数 like:点赞数 is_liked:被(up)点赞数 timestamp:发布时间戳 user_profile:UP主信息 dynamtic_id:动态id pre_dy_id_str:上一个转发的动态id orig_dy_id_str:源动态id type:4(原创文字)8(原创视频)1(转发)|
|data->cards->item->card|user->uid:UP主id user->uname:用户名 user->face:头像 item->content 内容|
|data->cards->item->display->emoji_info->emoji_details|列表|
|data->cards->item->display->emoji_info->emoji_details->item|emoji_name: 表情名称 url:链接地址|
|data->cards->item->display->comment_info->comments->[0]|uid:热评第一的uid name:热评第一用户名 content:热评第一评论内容 comment_ids:热评第一评论id|