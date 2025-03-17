"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = runSqlFile;
const promises_1 = __importDefault(require("fs/promises"));
const dbAccess_1 = __importDefault(require("./dbAccess"));
const config_1 = require("../config");
async function runSqlFile(fileName) {
    const file = await promises_1.default.readFile(config_1.migrationsPath + fileName, "utf8");
    await (0, dbAccess_1.default)(file);
}
