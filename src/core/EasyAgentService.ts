import DefaultPrompt from "../prompts/DefaultPrompt";
import IntentionPrompt from '../prompts/IntentionPrompt';
import SystemPrompt from "../prompts/SystemPrompt";
import { EasyAgentBase } from "./EasyAgentBase";
import { AiClientBase, IAiClientOption, IMessage, TMessageRole } from "./openai/AiClientBase";
import { AiFactory } from "./openai/aiFactory";
import { OpenaiClient } from './openai/openaiClient';
/**
 * 生成message
 * @param msg 
 * @param type 
 * @returns 
 */

export const genMessage = (msg:string, type: TMessageRole = 'system'):IMessage=>{
  return {
    role: type,
    content: msg
  }
}
export const jsonOutPut = (data:string)=>{
  return data.replace(/^```json\n/ig,"").replace(/\n```/ig,'')
}


export interface IActiveOption {
  message:string;
  model?:string;
}



export class EaseAgentService extends EasyAgentBase {

  client: AiClientBase
  
  option: IAiClientOption

  protected defaultPrompt:string;

  chatList: IMessage[] = [];


  constructor(option: IAiClientOption) {
    super()
    console.log("你想让我做什么？")
    this.option = option;
    this.defaultPrompt = DefaultPrompt();
    this.chatList.push(genMessage(this.defaultPrompt));
    this.client = AiFactory.getClient(option.type, option) as OpenaiClient;
  }

  async chatToAi(option:any) {
    this.chatList.push(genMessage(option.message, 'user'));
    const newOption = {
      model: this.option.model || "",
      ...option,
      messages: [...this.chatList]
    }
    return await this.client.chat(newOption);
  }
  
  async chat(option: IActiveOption) {
    if(this.callback) {
      this.callback(option.message);
      this.callback = null;
      return
    }
    const newOption = {
      model: this.option.model || "",
     
      ...option,
    }
    // console.log("thinking...")
    const intention = await this.anylsizeIntention(newOption);
    switch(intention.type) {
      case 'system':
        {
          const systemCommand = await this.getSystemMessageFromLLM(newOption);
          this.updateChatList(JSON.stringify(systemCommand));
          /**
           * 设置输入回调
           */
          this.setInputCallBack({action:'command', type:'confirm', content:systemCommand.cmd})
          break
        };
      default:
        {
          const response = await this.chatToAi(newOption);
          const message = response.choices[0]?.message.content;
          this.updateChatList(message);
          this.dispatchData(message); 
        }
    }
  }

  dispatchData(message: any){
    this.dispatchEvent('data', message);
  }
 




  /**
   * 更新聊天列表
   * @param message 
   */
  async updateChatList(message:string ) {
    this.chatList.push(genMessage(message, 'assistant'));
  };
  

  
 

  /**
   * 意图分析
   * @param option 
   */
  async anylsizeIntention(option:IActiveOption) {
    const messages = [ genMessage(IntentionPrompt()), genMessage(option.message, 'user')];
    const intention = await this.client.chat({
      ...option,
      messages,
      response_format: {
        type: "json_object"
      },
    })
    try{
      const intentionMessage = intention.choices[0].message;
      const data = jsonOutPut(intentionMessage.content);
      const intentionObj = JSON.parse(data);
      return intentionObj;
    }catch(e) {
      console.log(e)
    }
  }

  async getSystemMessageFromLLM(option:IActiveOption) {
    const messages = [genMessage(SystemPrompt()),genMessage(option.message, 'user')];
    const response = await this.client.chat({
      ...option,
      messages,
    })
    const res = response.choices[0].message.content.replace(/```sh/ig,'').replace(/```/ig,'');
    const data = jsonOutPut(res);
    return JSON.parse(data);
  }
  async stopChat() {
    // return await this.client.chat(option);
  }
}