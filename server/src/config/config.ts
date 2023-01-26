import dotenv from "dotenv";
dotenv.config();

function getEnv(name: string, defaultValue?: string | number | boolean) {
  return process.env[name] ?? defaultValue;
}

export const URI = getEnv("DATABASE_URI") as string;
export const PORT = getEnv("PORT", 4000);
export const SECRET_KEY = getEnv("SECRET_KEY")
export const EXPIRED_TIME = getEnv("EXPIRED_TIME") as number | string;
