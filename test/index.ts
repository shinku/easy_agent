import { readFileSync } from "fs";
import { join } from "path";
import { EaseAgentService } from "../src/core/EasyAgentService";
import { IExectueAction } from "../src/core/executor";
const keys = readFileSync(join(__dirname,'../key.txt'),{encoding: 'utf-8'});

/**
 * 在本地留一个key.txt,放置你的apikey
 * 比如：
 * deepseek=sk-xxxxxxx
 * 获取apikey
 * @param key 
 * @returns 
 */
const getKey = (key)=>{
  return keys.split("\n").find(item=>{
    return item.split("=")[0] === key;
  })?.split("=")[1]
}


const service = new EaseAgentService({
  type:"deepseek",
  model:"deepseek-chat",
  apiKey:getKey('deepseek'),
})

process.stdin.on('data', (data)=>{
  const input = data.toString().trim();
  service.chat({message:input});
})

service.on('require_input', (option: IExectueAction)=>{
  switch(option.type) {
    case "confirm": process.stdout.write(`是否需要执行操作？：${option.content} （yes/no）`)
  }
})

service.on('data', (data)=>{
  console.info('[Agent Says:]\n', data)
})