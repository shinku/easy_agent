import { ChatCompletionCreateParamsStreaming } from "openai/resources/index.mjs";
export interface IAiClientOption {
  model?:string;
  [key:string]: any
}
/**
 * 消息角色
 */
export type TMessageRole = 'system' | 'user' | 'assistant';
/**
 * 消息
 */
export interface IMessage {
  role: TMessageRole;
  content: string;
}

export class AiClientBase {
  option: IAiClientOption;
  constructor(option:IAiClientOption) {
    this.option = option;
  }
  async chat(option: ChatCompletionCreateParamsStreaming):Promise<any> {
    return null;
  }
}

