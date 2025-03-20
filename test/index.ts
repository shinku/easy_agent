import { readFileSync } from "fs";
import { join } from "path";
import { EaseAgentService } from "../src/core/EasyAgentService";
import { IExectueAction } from "../src/core/executor";
const keys = readFileSync(join(__dirname,'../key.txt'),{encoding: 'utf-8'});
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
    case "confirm": process.stdout.write(`是否需要执行操作？：\n${option.content}\n（yes/no）`)
  }
})

service.on('data', (data)=>{
  console.log('[Agent Says:]', data)
})