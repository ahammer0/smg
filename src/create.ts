import dotenv from "dotenv";
import fs from "fs/promises";
import { migrationsPath } from "./config";
import { getRegister, setRegister } from "./lib/fileAccess";
import c from "ansi-colors";

export default async function create(name: string, force = false) {
  const migrationTimestamp = Date.now().toFixed(0).toString();
  const migrationUID = `${migrationTimestamp}_${name}`;

  const register = await getRegister();

  //check if last migration is already applied
  if (!force) {
    const last = register.migrations[register.migrations.length - 1];
    if (last && !last.isApplied) {
      console.log(c.red("Last migration is not applied. Aborting..."));
      console.log(c.red("Use --force to force creation"));
      console.log("\n Unapplied Migration:");

      const lastMigrationId = register.migrations.findIndex((m) => m.isApplied);
      register.migrations.slice(lastMigrationId).forEach((m) => {
        console.log(` - ${m.name}`);
      });
      process.exit();
    }
  }

  console.log("Creating migrations files");
  await fs.writeFile(`${migrationsPath}${migrationUID}_up.sql`, "");
  await fs.writeFile(`${migrationsPath}${migrationUID}_down.sql`, "");

  //adding migration to register
  register.migrations.push({
    name: migrationUID,
    up: `${migrationTimestamp}_${name}_up.sql`,
    down: `${migrationTimestamp}_${name}_down.sql`,
    isApplied: false,
  });

  // writing register
  await setRegister(register);
  console.log(c.green(`Migration ${migrationUID} created`));
}
