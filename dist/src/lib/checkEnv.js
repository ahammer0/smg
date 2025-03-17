"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkEnv;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Enforce that DB_NAME, DB_USER and DB_PASS are defined in .env file
 */
function checkEnv() {
    if (!process.env.DB_NAME) {
        throw new Error("DB_NAME is not defined");
    }
    if (!process.env.DB_USER) {
        throw new Error("DB_USER is not defined");
    }
    if (process.env.DB_PASS) {
        throw new Error("DB_PASS is not defined");
    }
}
