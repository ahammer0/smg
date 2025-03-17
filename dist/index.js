#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const create_1 = __importDefault(require("./src/create"));
const init_1 = require("./src/init");
const argsParser_1 = __importDefault(require("./src/lib/argsParser"));
const ansi_colors_1 = __importDefault(require("ansi-colors"));
const displayHelp_1 = __importDefault(require("./src/lib/displayHelp"));
const update_1 = __importDefault(require("./src/update"));
const revert_1 = __importDefault(require("./src/revert"));
const confirm_1 = __importDefault(require("./src/lib/confirm"));
const log_1 = __importDefault(require("./src/log"));
//TODO: refacto to avoid reverse
const args = process.argv.slice(2).reverse();
//parsing args
// first arg should de command
const func = args.pop();
switch (func) {
    case "init":
        (0, init_1.init)();
        break;
    case "create":
        const argsObj = (0, argsParser_1.default)(args);
        const name = args.pop();
        if (!name)
            throw new Error("Missing name argument");
        const force = "force" in argsObj ? argsObj.force === true : false;
        (0, create_1.default)(name, force);
        break;
    case "createdb":
        (0, node_test_1.todo)();
        break;
    case "update":
        (0, update_1.default)();
        break;
    case "dump":
        (0, node_test_1.todo)();
        break;
    case "revert":
        const number = parseInt(args.pop() ?? "");
        if (isNaN(number)) {
            (0, confirm_1.default)("This will revert the last migration. Data will be lost.").then(() => {
                (0, revert_1.default)(1);
            });
        }
        else {
            (0, confirm_1.default)("This will revert the last " +
                number +
                " migration(s). Data will be lost.").then(() => {
                (0, revert_1.default)(number);
            });
        }
        break;
    case "log":
        const all = args.includes("-a");
        if (all) {
            (0, log_1.default)(0);
        }
        else {
            (0, log_1.default)();
        }
        break;
    default:
        if (typeof func === "string") {
            console.log(ansi_colors_1.default.red(`Command '${func}' does not exist`));
        }
        (0, displayHelp_1.default)();
}
