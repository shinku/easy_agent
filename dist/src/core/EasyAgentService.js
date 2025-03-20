"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EaseAgentService = exports.jsonOutPut = exports.genMessage = void 0;
const DefaultPrompt_1 = __importDefault(require("../prompts/DefaultPrompt"));
const IntentionPrompt_1 = __importDefault(require("../prompts/IntentionPrompt"));
const SystemPrompt_1 = __importDefault(require("../prompts/SystemPrompt"));
const EasyAgentBase_1 = require("./EasyAgentBase");
const aiFactory_1 = require("./openai/aiFactory");
/**
 * 生成message
 * @param msg
 * @param type
 * @returns
 */
const genMessage = (msg, type = 'system') => {
    return {
        role: type,
        content: msg
    };
};
exports.genMessage = genMessage;
const jsonOutPut = (data) => {
    return data.replace(/^```json\n/ig, "").replace(/\n```/ig, '');
};
exports.jsonOutPut = jsonOutPut;
class EaseAgentService extends EasyAgentBase_1.EasyAgentBase {
    client;
    option;
    defaultPrompt;
    chatList = [];
    constructor(option) {
        super();
        console.log("你想让我做什么？");
        this.option = option;
        this.defaultPrompt = (0, DefaultPrompt_1.default)();
        this.chatList.push((0, exports.genMessage)(this.defaultPrompt));
        this.client = aiFactory_1.AiFactory.getClient(option.type, option);
    }
    async chatToAi(option) {
        this.chatList.push((0, exports.genMessage)(option.message, 'user'));
        const newOption = {
            model: this.option.model || "",
            ...option,
            messages: [...this.chatList]
        };
        return await this.client.chat(newOption);
    }
    async chat(option) {
        if (this.callback) {
            this.callback(option.message);
            this.callback = null;
            return;
        }
        const newOption = {
            model: this.option.model || "",
            ...option,
        };
        // console.log("thinking...")
        const intention = await this.anylsizeIntention(newOption);
        switch (intention.type) {
            case 'system':
                {
                    const systemCommand = await this.getSystemMessageFromLLM(newOption);
                    this.updateChatList(JSON.stringify(systemCommand));
                    /**
                     * 设置输入回调
                     */
                    this.setInputCallBack({ action: 'command', type: 'confirm', content: systemCommand.cmd });
                    break;
                }
                ;
            default:
                {
                    const response = await this.chatToAi(newOption);
                    const message = response.choices[0]?.message.content;
                    this.updateChatList(message);
                    this.dispatchData(message);
                }
        }
    }
    dispatchData(message) {
        this.dispatchEvent('data', message);
    }
    /**
     * 更新聊天列表
     * @param message
     */
    async updateChatList(message) {
        this.chatList.push((0, exports.genMessage)(message, 'assistant'));
    }
    ;
    /**
     * 意图分析
     * @param option
     */
    async anylsizeIntention(option) {
        const messages = [(0, exports.genMessage)((0, IntentionPrompt_1.default)()), (0, exports.genMessage)(option.message, 'user')];
        const intention = await this.client.chat({
            ...option,
            messages,
            response_format: {
                type: "json_object"
            },
        });
        try {
            const intentionMessage = intention.choices[0].message;
            const data = (0, exports.jsonOutPut)(intentionMessage.content);
            const intentionObj = JSON.parse(data);
            return intentionObj;
        }
        catch (e) {
            console.log(e);
        }
    }
    async getSystemMessageFromLLM(option) {
        const messages = [(0, exports.genMessage)((0, SystemPrompt_1.default)()), (0, exports.genMessage)(option.message, 'user')];
        const response = await this.client.chat({
            ...option,
            messages,
        });
        const res = response.choices[0].message.content.replace(/```sh/ig, '').replace(/```/ig, '');
        const data = (0, exports.jsonOutPut)(res);
        return JSON.parse(data);
    }
    async stopChat() {
        // return await this.client.chat(option);
    }
}
exports.EaseAgentService = EaseAgentService;
//# sourceMappingURL=EasyAgentService.js.map