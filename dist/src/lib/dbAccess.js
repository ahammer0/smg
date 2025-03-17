"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = query;
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const checkEnv_1 = __importDefault(require("./checkEnv"));
/**
 * @async
 * Performs a multiline query to db set in `.env` file
 */
async function query(query) {
    (0, checkEnv_1.default)();
    const db = await promise_mysql_1.default.createConnection({
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASS || "",
        database: process.env.DB_NAME,
        multipleStatements: true,
    });
    db.beginTransaction();
    try {
        await db.query(query);
    }
    catch (e) {
        db.rollback();
        db.end();
        throw e;
    }
    db.commit();
    db.end();
}
