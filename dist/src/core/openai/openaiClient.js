"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenaiClient = void 0;
const openai_1 = __importDefault(require("openai"));
const AiClientBase_1 = require("./AiClientBase");
class OpenaiClient extends AiClientBase_1.AiClientBase {
    openai;
    constructor(option) {
        super(option);
        this.openai = new openai_1.default(option);
    }
    async chat(option) {
        console.log("      i am thinking...");
        // console.log('chating:', option.messages.slice(-1)[0].content);
        try {
            const chatCompletion = await this.openai.chat.completions.create(option);
            return chatCompletion;
        }
        catch (e) {
            console.log(e);
        }
        return null;
    }
}
exports.OpenaiClient = OpenaiClient;
//# sourceMappingURL=openaiClient.js.map