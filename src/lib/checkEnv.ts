import dotenv from "dotenv";

dotenv.config();

/**
 * Enforce that DB_NAME, DB_USER and DB_PASS are defined in .env file
 */
export default function checkEnv() {
  if (!process.env.DB_NAME) {
    throw new Error("DB_NAME is not defined");
  }
  if (!process.env.DB_USER) {
    throw new Error("DB_USER is not defined");
  }
  if (process.env.DB_PASS) {
    throw new Error("DB_PASS is not defined");
  }
}
