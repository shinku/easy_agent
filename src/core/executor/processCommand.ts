import { exec } from "child_process";
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
    exec(option.content,(err,stdout,stderr)=>{
      if(err){
        this.emit('data',err.message)
      }else{
        this.emit('data',stdout)
      }
    })
  }
}