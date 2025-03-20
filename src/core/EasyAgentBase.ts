import EventEmitter from "events";
import { ExecutorManager, IExectueAction } from "./executor/index";


export class EasyAgentBase extends EventEmitter{

  /**
   * 回调执行器
   */
  callback: Function;
  executor: ExecutorManager;
  constructor(){
    // console.log('EasyAgentBase constructor');
    super();
    this.executor = new ExecutorManager();
    this.executor.on('data', (data)=>{
      this.emit('data', data);
    })
  }
  dispatchEvent(eventName: string, content: any) {
    super.emit(eventName, content);
  }
  setInputCallBack(option: IExectueAction){
    this.callback = (input)=>{
      if(option.type === 'confirm') {
        if(!['yes','no','y','n'].includes(input.toString().toLowerCase())) {
          this.setInputCallBack(option);
          return;
        }
      }
      this.executor.execute(option, input);
    }
    this.dispatchEvent('require_input', option);
  }
}