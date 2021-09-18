### Get Asdb For Github Webhook

##### 使用
1. 确保你已经安装go,执行`go get .`获取必要的包
2. 执行
    ```
        $: GithubToken=xxxxxx 
        $: export GithubToken
    ```
    来导入配置的GIthubToken

3. 配置 config.json 中的各项值(请在三确保targetPath的配置)
4. `go run .` 以运行, 长时间运行请使用 `nohup go run . &`