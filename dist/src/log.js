"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = log;
const fileAccess_1 = require("./lib/fileAccess");
async function log(amount = 10) {
    const register = await (0, fileAccess_1.getRegister)();
    const log = register.migrations.slice(-amount).map((migration) => {
        return { name: migration.name, isApplied: migration.isApplied };
    });
    console.table(log);
}
