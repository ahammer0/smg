import mysql from "promise-mysql";
import checkEnv from "./checkEnv";

/**
 * @async
 * Performs a multiline query to db set in `.env` file
 */
export default async function query(query: string) {
  checkEnv();
  const db = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME,
    multipleStatements: true,
  });
  db.beginTransaction();
  try {
    await db.query(query);
  } catch (e) {
    db.rollback();
    db.end();
    throw e;
  }
  db.commit();
  db.end();
}
