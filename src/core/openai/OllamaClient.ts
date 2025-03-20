import axios from 'axios';
import { AiClientBase } from './AiClientBase';

const messagesToPrompt = (messages):string => {
  return messages
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join('\n');
}
export class OllamaClient extends AiClientBase {
 
  constructor(option) {
    super(option)
  }
  async chat(option) {  
    const prompt = messagesToPrompt(option.messages);
    const body = {
      model: option.model,
      prompt,
      stream: option.stream || false, 
    }
    const response = await axios.post(`http://localhost:11434/api/generate`, body,{
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    });

    if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.data?.response;
    return {
        id: 'ollama-completion-id',
        object: 'text_completion',
        created: Math.floor(Date.now() / 1000),
        model: option.model,
        choices: [
            {
                message: {content: data},
                index: 0,
                logprobs: null,
                finish_reason: 'length',
            },
        ],
        usage: {
        },
    };
  }  
}