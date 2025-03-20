"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EasyAgentBase = void 0;
const events_1 = __importDefault(require("events"));
const index_1 = require("./executor/index");
class EasyAgentBase extends events_1.default {
    /**
     * 回调执行器
     */
    callback;
    executor;
    constructor() {
        // console.log('EasyAgentBase constructor');
        super();
        this.executor = new index_1.ExecutorManager();
        this.executor.on('data', (data) => {
            this.emit('data', data);
        });
    }
    dispatchEvent(eventName, content) {
        super.emit(eventName, content);
    }
    setInputCallBack(option) {
        this.callback = (input) => {
            if (option.type === 'confirm') {
                if (!['yes', 'no', 'y', 'n'].includes(input.toString().toLowerCase())) {
                    this.setInputCallBack(option);
                    return;
                }
            }
            this.executor.execute(option, input);
        };
        this.dispatchEvent('require_input', option);
    }
}
exports.EasyAgentBase = EasyAgentBase;
//# sourceMappingURL=EasyAgentBase.js.map