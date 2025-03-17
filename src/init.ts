import fs from "fs/promises";
import {
  migrationsPath,
  migrationRegisterPath,
  localLockPath,
  rootPath,
} from "./config";
import c from "ansi-colors";

export async function init() {
  console.log("Initializing migrations folder and files");
  await fs.mkdir(migrationsPath, { recursive: true });

  try {
    await fs.access(migrationRegisterPath);
    console.log(c.red("Migration register file already exists. Aborting..."));
    process.exit();
  } catch {}

  console.log("Creating migration register file");
  await fs.writeFile(
    migrationRegisterPath,
    JSON.stringify({ current: null, migrations: [] }),
  );

  console.log("Creating local lock file");
  await fs.writeFile(localLockPath, JSON.stringify({ current: null }));

  console.log("Adding local lock file to .gitignore");
  await fs.appendFile(`${rootPath}.gitignore`, `localLock.json`);

  console.log(c.green("Init done"));
}
