import { getRegister } from "./lib/fileAccess";
export default async function log(amount = 10) {
  const register = await getRegister();
  const log = register.migrations.slice(-amount).map((migration) => {
    return { name: migration.name, isApplied: migration.isApplied };
  });
  console.table(log);
}
