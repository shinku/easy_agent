import { EventEmitter } from "stream";
export declare class BaseExecutor extends EventEmitter {
    /**
     *
     * @param content
     * @param input 交互输入
     */
    exec(content: any, input: any): void;
}
