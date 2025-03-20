//https://api.deepseek.com/v1

import { OpenaiClient } from './openaiClient';
export class DeepSeekClient extends OpenaiClient {
  constructor(option:any) {
    super({...option, baseURL:'https://api.deepseek.com/v1'})
  }
} 