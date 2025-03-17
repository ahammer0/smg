import c from "ansi-colors";

export default function displayHelp() {
  console.log(`
Usage: smg [command] [options]

init 
  initialize migrations folder and files

create ${c.italic("name")}
  create a new migration

createdb 
  create the database

update 
  update the database with the latest migrations

dump 
  dump the database

revert ${c.italic("number")}
  Reverts database [number] schema. If no number is given, it will revert to the last migration.

log ${c.italic("-a")}
  Prints log of migrations
  Default, prints last 10 migrations.
  
  -a  Prints all migrations

`);
}
