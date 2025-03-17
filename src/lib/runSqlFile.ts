import fs from "fs/promises";
import query from "./dbAccess";
import { migrationsPath } from "../config";

export default async function runSqlFile(fileName: string) {
  const file = await fs.readFile(migrationsPath + fileName, "utf8");
  await query(file);
}
