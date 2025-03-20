import OpenAI from "openai";
import { ChatCompletionCreateParamsStreaming } from "openai/resources/index.mjs";
import { AiClientBase, IAiClientOption } from './AiClientBase';
/**
 * OpenaiClientOption
 */
export interface OpenaiClientOption extends IAiClientOption {
    apiKey: string;
    baseURL?: string;
    type: string;
    model?: string;
}
export declare class OpenaiClient extends AiClientBase {
    openai: OpenAI;
    constructor(option: OpenaiClientOption);
    chat(option: ChatCompletionCreateParamsStreaming): Promise<OpenAI.Chat.Completions.ChatCompletion & {
        _request_id?: string | null;
    }>;
}
