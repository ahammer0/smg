"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = confirm;
const node_readline_1 = __importDefault(require("node:readline"));
/**
 *  @async
 *  Prompts the user with optional message and resolve if user provided 'y'
 *  else exits program
 */
async function confirm(message) {
    const rl = node_readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const prom = new Promise((resolve, _reject) => {
        message && console.log(message);
        rl.question("Are you sure? (y/N)", (ans) => {
            rl.close();
            if (ans.toLowerCase() === "y") {
                resolve(true);
            }
            else {
                console.log("Aborting...");
                process.exit();
            }
        });
    });
    await prom;
}
