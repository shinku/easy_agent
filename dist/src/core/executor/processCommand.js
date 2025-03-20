"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processCommand = void 0;
const child_process_1 = require("child_process");
const BaseExecutor_1 = require("./BaseExecutor");
class processCommand extends BaseExecutor_1.BaseExecutor {
    exec(option, input) {
        process.stdout.write("[run command]:" + option.content + "\n");
        if (option.type === 'confirm') {
            if (['n', 'no'].includes(input.toLocaleLowerCase())) {
                return;
            }
        }
        (0, child_process_1.exec)(option.content, (err, stdout, stderr) => {
            if (err) {
                this.emit('data', err.message);
            }
            else {
                this.emit('data', stdout);
            }
        });
    }
}
exports.processCommand = processCommand;
//# sourceMappingURL=processCommand.js.map