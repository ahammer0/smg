import { getRegister, setRegister } from "./lib/fileAccess";
import runSqlFile from "./lib/runSqlFile";

export default async function revert(number: number) {
  const register = await getRegister();
  const migration =
    register.migrations[register.migrations.length - number - 1];
  console.log("Reverting database schema to migration " + migration.name);

  for (let i = number; i > 0; i--) {
    console.log("Reverting", register.migrations[i].name);
    await runSqlFile(register.migrations[i].down);
    register.migrations[i].isApplied = false;
  }

  setRegister(register);
}
