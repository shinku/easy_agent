"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OllamaClient = void 0;
const axios_1 = __importDefault(require("axios"));
const AiClientBase_1 = require("./AiClientBase");
const messagesToPrompt = (messages) => {
    return messages
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join('\n');
};
class OllamaClient extends AiClientBase_1.AiClientBase {
    constructor(option) {
        super(option);
    }
    async chat(option) {
        const prompt = messagesToPrompt(option.messages);
        const body = {
            model: option.model,
            prompt,
            stream: option.stream || false,
        };
        const response = await axios_1.default.post(`http://localhost:11434/api/generate`, body, {
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
                    message: { content: data },
                    index: 0,
                    logprobs: null,
                    finish_reason: 'length',
                },
            ],
            usage: {},
        };
    }
}
exports.OllamaClient = OllamaClient;
//# sourceMappingURL=OllamaClient.js.map