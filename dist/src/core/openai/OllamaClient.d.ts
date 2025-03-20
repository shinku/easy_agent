import { AiClientBase } from './AiClientBase';
export declare class OllamaClient extends AiClientBase {
    constructor(option: any);
    chat(option: any): Promise<{
        id: string;
        object: string;
        created: number;
        model: any;
        choices: {
            message: {
                content: any;
            };
            index: number;
            logprobs: any;
            finish_reason: string;
        }[];
        usage: {};
    }>;
}
