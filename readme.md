## 这是一个命令行工具，通过大模型能力解决日常命令行的执行问题

作为开发人员不会记住每一个操作系统的命令，所以这个工具可以帮助你。

本模块还比较粗糙，但是应可以完成基本的命令查找和执行。

注意千万不要尝试让agent帮你执行一些危险命令，比如 rm -rf /

这很危险!。

### how To use

+ clone当前目录至本地。
+ 确保你已经安装了nodejs环境。
+ 目录下新建 key.txt。比如deepseek的apikey放进去。例如：`deepseek=xxxxxxxx`

初始化

```npm i```

本地运行测试你就可以看到效果

```npm run test-dev```

从“你想让我做什么？”开始。

比如输入："帮我查下我的docker版本"

然后他会返回一个命令行让你确认是否执行。

``docker --version （yes/no）``

等你输入 y 或者 yes。

你将得到

```
[Agent Says:] Docker version 
[Agent Says:] 27.5.1, build 9f9e405
```

完整的输入输出过程如下

```
你想让我做什么？
帮我查下我的docker版本?
i am thinking...
i am thinking...
是否需要执行操作？：
docker --version
（yes/no）y
[run command]:docker --version
[Agent Says:] Docker version 
[Agent Says:] 27.5.1, build 9f9e405
```

### node模块使用
安装`easy_shell_agent`包
```npm i easy_shell_agent```
参考
```typescript
const as = require('easy_shell_agent');
const {EasyAgentService} = as;
const service = new EasyAgentService({
  type:"deepseek",
  model:"deepseek-chat",
  apiKey:"xxxxxxxx"
})

process.stdin.on('data', (data)=>{
  const input = data.toString().trim();
  service.chat({message:input});
})

service.on('require_input', (option)=>{
  switch(option.type) {
    case "confirm": process.stdout.write(` 是否需要执行操作？：\n${option.content}\n（yes/no）`)
  }
})

service.on('data', (data)=>{
  console.log('[Agent Says:]', data)
})
```
