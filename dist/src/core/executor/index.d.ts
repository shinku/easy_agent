import { EventEmitter } from "stream";
import { BaseExecutor } from "./BaseExecutor";
export interface IExectueAction {
    action: "command" | string;
    type: "confirm" | "input" | "select";
    content: string;
}
export declare class ExecutorManager extends EventEmitter {
    executorMap: {
        [key: string]: BaseExecutor;
    };
    executors: BaseExecutor[];
    execute(action: IExectueAction, input: any): void;
}
