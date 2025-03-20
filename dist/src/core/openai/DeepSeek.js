"use strict";
//https://api.deepseek.com/v1
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeepSeekClient = void 0;
const openaiClient_1 = require("./openaiClient");
class DeepSeekClient extends openaiClient_1.OpenaiClient {
    constructor(option) {
        super({ ...option, baseURL: 'https://api.deepseek.com/v1' });
    }
}
exports.DeepSeekClient = DeepSeekClient;
//# sourceMappingURL=DeepSeek.js.map