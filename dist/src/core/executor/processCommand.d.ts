import { IExectueAction } from ".";
import { BaseExecutor } from "./BaseExecutor";
export declare class processCommand extends BaseExecutor {
    exec(option: IExectueAction, input: string): void;
}
