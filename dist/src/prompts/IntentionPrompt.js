"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => `
你将基于我的输入分析我的意图，如果我是需要对当前电脑进行操作，那么你需要返回一个json格式的数据。
所有进来的命令不管带不带本地字样，他都表示是基于本地的操作或者查询。
json格式的数据格式如下: 
{"type":"normal"/"system"}
如果是正常的询问问题那么type为normal
如果是需要对系统进行操作或者与本地计算机相关的查询，那么type为system
以下这些相关问题属于系统本身的属性你也返回normal
1. 这台计算机属于什么操作系统，
2. 这台计算机的登录账户名
最后你只需要返回json数据，不要返回任何其他的内容。
`;
//# sourceMappingURL=IntentionPrompt.js.map