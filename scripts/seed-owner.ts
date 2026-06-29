import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { users } from "../src/db/schema";
import { getDb } from "../src/lib/db";

function readArg(name: string) {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

async function main() {
  const email = readArg("email")?.toLowerCase();
  const password = readArg("password");
  const role = (readArg("role") || "OWNER").toUpperCase() as "OWNER" | "ADMIN";

  if (!email || !password) {
    throw new Error('Usage: npm run seed:owner -- --email owner@example.com --password "temporary-password" --role OWNER');
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const db = getDb();
  const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (existing) {
    await db.update(users).set({ passwordHash, role, isActive: true, updatedAt: new Date() }).where(eq(users.id, existing.id));
    console.log(`Updated owner/admin user ${email}`);
    return;
  }

  await db.insert(users).values({ email, passwordHash, role, isActive: true });
  console.log(`Created owner/admin user ${email}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
