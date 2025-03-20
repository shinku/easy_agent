import OpenAI from "openai";
import { ChatCompletionCreateParamsStreaming } from "openai/resources/index.mjs";
import { AiClientBase, IAiClientOption } from './AiClientBase';
/**
 * OpenaiClientOption
 */
export interface OpenaiClientOption extends IAiClientOption {
  apiKey: string;
  baseURL?: string;
  type:string;
  model?:string;
}

export class OpenaiClient extends AiClientBase { 
  openai: OpenAI;
  constructor(option:OpenaiClientOption) {
    super(option as IAiClientOption)
    this.openai = new OpenAI(option);
  }
  async chat(option:ChatCompletionCreateParamsStreaming) {
    console.log("i am thinging...");
    // console.log('chating:', option.messages.slice(-1)[0].content);
    try { 
      const chatCompletion = await this.openai.chat.completions.create(option);
      return chatCompletion;
    }
    catch(e){
      console.log(e)
    }
    return null;
  }
}