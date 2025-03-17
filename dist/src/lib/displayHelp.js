"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = displayHelp;
const ansi_colors_1 = __importDefault(require("ansi-colors"));
function displayHelp() {
    console.log(`
Usage: smg [command] [options]

init 
  initialize migrations folder and files

create ${ansi_colors_1.default.italic("name")}
  create a new migration

createdb 
  create the database

update 
  update the database with the latest migrations

dump 
  dump the database

revert ${ansi_colors_1.default.italic("number")}
  Reverts database [number] schema. If no number is given, it will revert to the last migration.

log ${ansi_colors_1.default.italic("-a")}
  Prints log of migrations
  Default, prints last 10 migrations.
  
  -a  Prints all migrations

`);
}
