"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = revert;
const fileAccess_1 = require("./lib/fileAccess");
const runSqlFile_1 = __importDefault(require("./lib/runSqlFile"));
async function revert(number) {
    const register = await (0, fileAccess_1.getRegister)();
    const migration = register.migrations[register.migrations.length - number - 1];
    console.log("Reverting database schema to migration " + migration.name);
    for (let i = number; i > 0; i--) {
        console.log("Reverting", register.migrations[i].name);
        await (0, runSqlFile_1.default)(register.migrations[i].down);
        register.migrations[i].isApplied = false;
    }
    (0, fileAccess_1.setRegister)(register);
}
