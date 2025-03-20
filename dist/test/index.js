"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const EasyAgentService_1 = require("../src/core/EasyAgentService");
const keys = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../key.txt'), { encoding: 'utf-8' });
/**
 * 在本地留一个key.txt,放置你的apikey
 * 比如：
 * deepseek=sk-xxxxxxx
 * 获取apikey
 * @param key
 * @returns
 */
const getKey = (key) => {
    return keys.split("\n").find(item => {
        return item.split("=")[0] === key;
    })?.split("=")[1];
};
const service = new EasyAgentService_1.EaseAgentService({
    type: "deepseek",
    model: "deepseek-chat",
    apiKey: getKey('deepseek'),
});
process.stdin.on('data', (data) => {
    const input = data.toString().trim();
    service.chat({ message: input });
});
service.on('require_input', (option) => {
    switch (option.type) {
        case "confirm": process.stdout.write(`是否需要执行操作？：${option.content} （yes/no）`);
    }
});
service.on('data', (data) => {
    console.info('[Agent Says:]\n', data);
});
//# sourceMappingURL=index.js.map