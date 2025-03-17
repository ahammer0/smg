"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create;
const promises_1 = __importDefault(require("fs/promises"));
const config_1 = require("./config");
const fileAccess_1 = require("./lib/fileAccess");
const ansi_colors_1 = __importDefault(require("ansi-colors"));
async function create(name, force = false) {
    const migrationTimestamp = Date.now().toFixed(0).toString();
    const migrationUID = `${migrationTimestamp}_${name}`;
    const register = await (0, fileAccess_1.getRegister)();
    //check if last migration is already applied
    if (!force) {
        const last = register.migrations[register.migrations.length - 1];
        if (last && !last.isApplied) {
            console.log(ansi_colors_1.default.red("Last migration is not applied. Aborting..."));
            console.log(ansi_colors_1.default.red("Use --force to force creation"));
            console.log("\n Unapplied Migration:");
            const lastMigrationId = register.migrations.findIndex((m) => m.isApplied);
            register.migrations.slice(lastMigrationId).forEach((m) => {
                console.log(` - ${m.name}`);
            });
            process.exit();
        }
    }
    console.log("Creating migrations files");
    await promises_1.default.writeFile(`${config_1.migrationsPath}${migrationUID}_up.sql`, "");
    await promises_1.default.writeFile(`${config_1.migrationsPath}${migrationUID}_down.sql`, "");
    //adding migration to register
    register.migrations.push({
        name: migrationUID,
        up: `${migrationTimestamp}_${name}_up.sql`,
        down: `${migrationTimestamp}_${name}_down.sql`,
        isApplied: false,
    });
    // writing register
    await (0, fileAccess_1.setRegister)(register);
    console.log(ansi_colors_1.default.green(`Migration ${migrationUID} created`));
}
