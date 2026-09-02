import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

let client: postgres.Sql | null = null;

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not configured.");
  }

  client ??= postgres(url, {
    max: 1,
    prepare: false,
    connect_timeout: 15,
    idle_timeout: 20,
    ssl: "require",
  });
  return drizzle(client, { schema });
}
