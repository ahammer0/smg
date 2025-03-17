"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
const promises_1 = __importDefault(require("fs/promises"));
const config_1 = require("./config");
const ansi_colors_1 = __importDefault(require("ansi-colors"));
async function init() {
    console.log("Initializing migrations folder and files");
    await promises_1.default.mkdir(config_1.migrationsPath, { recursive: true });
    try {
        await promises_1.default.access(config_1.migrationRegisterPath);
        console.log(ansi_colors_1.default.red("Migration register file already exists. Aborting..."));
        process.exit();
    }
    catch { }
    console.log("Creating migration register file");
    await promises_1.default.writeFile(config_1.migrationRegisterPath, JSON.stringify({ current: null, migrations: [] }));
    console.log("Creating local lock file");
    await promises_1.default.writeFile(config_1.localLockPath, JSON.stringify({ current: null }));
    console.log("Adding local lock file to .gitignore");
    await promises_1.default.appendFile(`${config_1.rootPath}.gitignore`, `localLock.json`);
    console.log(ansi_colors_1.default.green("Init done"));
}
