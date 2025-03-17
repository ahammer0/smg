import { getRegister, setRegister } from "./lib/fileAccess";
import c from "ansi-colors";
import runSqlFile from "./lib/runSqlFile";

export default async function update() {
  console.log("Updating database with latest migrations");

  const register = await getRegister();
  let current = "";

  for (let i = 0; i < register.migrations.length; i++) {
    if (!register.migrations[i].isApplied) {
      console.log("Applying", register.migrations[i].name);
      await runSqlFile(register.migrations[i].up);
      current = register.migrations[i].name;
      register.migrations[i].isApplied = true;
    }
  }

  register.current = current;
  setRegister(register);

  console.log(c.green("Update done"));
}
