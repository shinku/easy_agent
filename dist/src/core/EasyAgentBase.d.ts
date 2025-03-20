import EventEmitter from "events";
import { ExecutorManager, IExectueAction } from "./executor/index";
export declare class EasyAgentBase extends EventEmitter {
    /**
     * 回调执行器
     */
    callback: Function;
    executor: ExecutorManager;
    constructor();
    dispatchEvent(eventName: string, content: any): void;
    setInputCallBack(option: IExectueAction): void;
}
