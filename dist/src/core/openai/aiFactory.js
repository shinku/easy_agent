"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiFactory = void 0;
const DeepSeek_1 = require("./DeepSeek");
const OllamaClient_1 = require("./OllamaClient");
const openaiClient_1 = require("./openaiClient");
class AiFactory {
    static clients = {};
    static reginster(type, client) {
        AiFactory.clients[type] = client;
    }
    static getClient(type, option) {
        const Client = AiFactory.clients[type];
        if (!Client) {
            throw new Error(`client ${type} not found`);
        }
        return new Client(option);
    }
}
exports.AiFactory = AiFactory;
AiFactory.reginster('openai', openaiClient_1.OpenaiClient);
AiFactory.reginster('ollama', OllamaClient_1.OllamaClient);
AiFactory.reginster('deepseek', DeepSeek_1.DeepSeekClient);
//# sourceMappingURL=aiFactory.js.map