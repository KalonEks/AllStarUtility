import crypto from "crypto";
import { cookies } from "next/headers";

const cookieName = "mb_session";

function secret() {
  const value = process.env.SESSION_SECRET;
  if (!value) throw new Error("SESSION_SECRET is not configured.");
  return value;
}

export function hashIp(input: string) {
  const salt = process.env.IP_HASH_SALT || secret();
  return crypto.createHash("sha256").update(`${salt}:${input}`).digest("hex");
}

export function signSession(payload: { userId: string; email: string; role: string }) {
  const expiresAt = Date.now() + 1000 * 60 * 60 * 12;
  const body = Buffer.from(JSON.stringify({ ...payload, expiresAt })).toString("base64url");
  const sig = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifySession(token?: string) {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as {
    userId: string;
    email: string;
    role: string;
    expiresAt: number;
  };
  if (payload.expiresAt < Date.now()) return null;
  return payload;
}

export async function getSession() {
  const store = await cookies();
  return verifySession(store.get(cookieName)?.value);
}

export async function setSessionCookie(token: string) {
  const store = await cookies();
  store.set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(cookieName);
}
