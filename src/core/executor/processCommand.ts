import { spawn } from "child_process";
import { IExectueAction } from ".";
import { BaseExecutor } from "./BaseExecutor";

export class processCommand extends BaseExecutor {
  exec(option: IExectueAction, input:string){
    process.stdout.write("[run command]:" + option.content +"\n");
    if(option.type ==='confirm') {
      if(['n','no'].includes(input.toLocaleLowerCase())) {
        return;
      }
    }
    const cli = spawn(option.content.split(" ")[0],option.content.split(" ").slice(0))
    cli.stdout.on('data', (data)=>{
      const res = Buffer.from(data).toString()
      this.emit('data',res)
    })
  }
}