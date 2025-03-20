import { EasyAgentBase } from "./EasyAgentBase";
import { AiClientBase, IAiClientOption, IMessage, TMessageRole } from "./openai/AiClientBase";
/**
 * 生成message
 * @param msg
 * @param type
 * @returns
 */
export declare const genMessage: (msg: string, type?: TMessageRole) => IMessage;
export declare const jsonOutPut: (data: string) => string;
export interface IActiveOption {
    message: string;
    model?: string;
}
export declare class EasyAgentService extends EasyAgentBase {
    client: AiClientBase;
    option: IAiClientOption;
    protected defaultPrompt: string;
    chatList: IMessage[];
    constructor(option: IAiClientOption);
    chatToAi(option: any): Promise<any>;
    chat(option: IActiveOption): Promise<void>;
    dispatchData(message: any): void;
    /**
     * 更新聊天列表
     * @param message
     */
    updateChatList(message: string): Promise<void>;
    /**
     * 意图分析
     * @param option
     */
    anylsizeIntention(option: IActiveOption): Promise<any>;
    getSystemMessageFromLLM(option: IActiveOption): Promise<any>;
    stopChat(): Promise<void>;
}
