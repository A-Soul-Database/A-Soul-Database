### Get Asdb

#### 若您希望自动拉取最新的 asdb 数据供您使用，您可以考虑部署该项目于您的服务器/主机上

#####  我该如何把我的服务器连接添加到项目的Webhook上？
由于Github原生目前仅能添加20个Webhook，不利于以后的维护。故使用GitHub Actions。你可以向/tools/getAsdb/webhooks 中按行添加你的服务器地址,当有新的push时，Github Actions 会自动按照这份list向您的服务器发送Webhook.

#####  如果我没有公网Ip,无法使用Webhooks该怎么办
您可以通过监听Github Api的更新进行pull,不过定期pull会耗费一定的网络，且确保您的网络条件可以连接Github