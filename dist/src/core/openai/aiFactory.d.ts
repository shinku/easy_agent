import { AiClientBase, IAiClientOption } from "./AiClientBase";
export declare class AiFactory {
    static clients: any;
    static reginster(type: string, client: typeof AiClientBase): void;
    static getClient(type: string, option: IAiClientOption): AiClientBase;
}
