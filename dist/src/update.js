"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = update;
const fileAccess_1 = require("./lib/fileAccess");
const ansi_colors_1 = __importDefault(require("ansi-colors"));
const runSqlFile_1 = __importDefault(require("./lib/runSqlFile"));
async function update() {
    console.log("Updating database with latest migrations");
    const register = await (0, fileAccess_1.getRegister)();
    let current = "";
    for (let i = 0; i < register.migrations.length; i++) {
        if (!register.migrations[i].isApplied) {
            console.log("Applying", register.migrations[i].name);
            await (0, runSqlFile_1.default)(register.migrations[i].up);
            current = register.migrations[i].name;
            register.migrations[i].isApplied = true;
        }
    }
    register.current = current;
    (0, fileAccess_1.setRegister)(register);
    console.log(ansi_colors_1.default.green("Update done"));
}
