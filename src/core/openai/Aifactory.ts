import { AiClientBase, IAiClientOption } from "./AiClientBase";
import { DeepSeekClient } from './DeepSeek';
import { OllamaClient } from './OllamaClient';
import { OpenaiClient } from "./openaiClient";

export class AiFactory {
  static clients:any = {};
  static reginster(type:string, client: typeof AiClientBase) {
    AiFactory.clients[type] = client;
  }
  static getClient(type:string, option:IAiClientOption):AiClientBase {
    const Client = AiFactory.clients[type];
    if(!Client) {
      throw new Error(`client ${type} not found`);
    }
    return new Client(option);
  }
}

AiFactory.reginster('openai', OpenaiClient);
AiFactory.reginster('ollama', OllamaClient);
AiFactory.reginster('deepseek', DeepSeekClient);