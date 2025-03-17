"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegister = getRegister;
exports.setRegister = setRegister;
exports.pushRegister = pushRegister;
exports.setLock = setLock;
exports.getLock = getLock;
const promises_1 = __importDefault(require("fs/promises"));
const config_1 = require("../config");
/**
 * @async
 * Gets the register file and returns the json object
 */
async function getRegister() {
    return JSON.parse(await promises_1.default.readFile(config_1.migrationRegisterPath, "utf8"));
}
/**
 * @async
 * Sets register file
 */
async function setRegister(migrationRegister) {
    await promises_1.default.writeFile(config_1.migrationRegisterPath, JSON.stringify(migrationRegister, null, 2), "utf8");
}
/**
 * @async
 * add new migration to register
 */
async function pushRegister(entry) {
    const register = await getRegister();
    register.migrations.push(entry);
    await setRegister(register);
}
async function setLock(entryUID) {
    const lock = { current: entryUID };
    await promises_1.default.writeFile(config_1.rootPath + "localLock.json", JSON.stringify(lock));
}
async function getLock() {
    return JSON.parse(await promises_1.default.readFile(config_1.rootPath + "localLock.json", "utf8"));
}
