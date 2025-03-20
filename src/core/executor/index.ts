import { EventEmitter } from "stream";
import { BaseExecutor } from "./BaseExecutor";
import { processCommand } from "./processCommand";

export interface IExectueAction {
  action: "command" | string;
  type:"confirm" | "input" | "select",
  content: string;
}
export class ExecutorManager extends EventEmitter{

  executorMap: {[key:string]: BaseExecutor} = {
    "command": new processCommand()
  };
    
  executors: BaseExecutor[] = [];
  execute(action: IExectueAction, input:any) {
   const executor = this.executorMap[action.action];
   if(executor){
      executor.exec(action, input);
      if(!this.executors.includes(executor)){
        this.executors.push(executor);
        executor.on("data", (data)=>this.emit('data', data));
      }
   }
  }
}