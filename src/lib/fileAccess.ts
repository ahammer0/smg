import fs from "fs/promises";
import { migrationRegisterPath, rootPath } from "../config";

interface MigrationEntry {
  name: string;
  up: string;
  down: string;
  isApplied: boolean;
}
interface MigrationRegister {
  current: string | null;
  migrations: MigrationEntry[];
}
interface Lock {
  current: string | null;
}

/**
 * @async
 * Gets the register file and returns the json object
 */
export async function getRegister(): Promise<MigrationRegister> {
  return JSON.parse(await fs.readFile(migrationRegisterPath, "utf8"));
}

/**
 * @async
 * Sets register file
 */
export async function setRegister(migrationRegister: MigrationRegister) {
  await fs.writeFile(
    migrationRegisterPath,
    JSON.stringify(migrationRegister, null, 2),
    "utf8",
  );
}

/**
 * @async
 * add new migration to register
 */
export async function pushRegister(entry: MigrationEntry) {
  const register = await getRegister();

  register.migrations.push(entry);
  await setRegister(register);
}

export async function setLock(entryUID: Lock["current"]) {
  const lock: Lock = { current: entryUID };
  await fs.writeFile(rootPath + "localLock.json", JSON.stringify(lock));
}

export async function getLock(): Promise<{ current: string | null }> {
  return JSON.parse(await fs.readFile(rootPath + "localLock.json", "utf8"));
}
