"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutorManager = void 0;
const stream_1 = require("stream");
const processCommand_1 = require("./processCommand");
class ExecutorManager extends stream_1.EventEmitter {
    executorMap = {
        "command": new processCommand_1.processCommand()
    };
    executors = [];
    execute(action, input) {
        const executor = this.executorMap[action.action];
        if (executor) {
            executor.exec(action, input);
            if (!this.executors.includes(executor)) {
                this.executors.push(executor);
                executor.on("data", (data) => this.emit('data', data));
            }
        }
    }
}
exports.ExecutorManager = ExecutorManager;
//# sourceMappingURL=index.js.map