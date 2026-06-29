import { NextRequest, NextResponse } from "next/server";
import { inquiries, inquiryEvents } from "@/db/schema";
import { getDb } from "@/lib/db";
import { sendInquiryEmail } from "@/lib/email";
import { hashIp } from "@/lib/security";
import { inquirySchema } from "@/lib/validation";

const rateLimit = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: NextRequest) {
  const raw = await request.json().catch(() => null);
  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the required fields and try again." }, { status: 400 });
  }

  const data = parsed.data;
  if (data.companyWebsite) {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ipHash = hashIp(ip);
  const current = rateLimit.get(ipHash);
  if (current && current.resetAt > Date.now() && current.count >= 5) {
    return NextResponse.json({ error: "Too many submissions. Please call if this is urgent." }, { status: 429 });
  }
  rateLimit.set(ipHash, {
    count: current && current.resetAt > Date.now() ? current.count + 1 : 1,
    resetAt: Date.now() + 1000 * 60 * 15,
  });

  if (process.env.TURNSTILE_SECRET_KEY) {
    const verified = await verifyTurnstile(data.turnstileToken, ip);
    if (!verified) {
      return NextResponse.json({ error: "Anti-spam verification failed." }, { status: 400 });
    }
  }

  const db = getDb();
  const [inserted] = await db
    .insert(inquiries)
    .values({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      preferredContactMethod: "phone",
      serviceAddress: data.serviceAddress,
      city: data.city,
      state: data.state,
      zip: data.zip,
      propertyType: data.propertyType,
      serviceNeeded: data.serviceNeeded,
      urgency: data.urgency,
      message: data.message,
      currentIssue: data.currentIssue || null,
      bestContactTime: data.bestContactTime || null,
      howHeard: data.howHeard || null,
      source: data.utm_source || null,
      landingPage: data.landingPage || null,
      referrer: data.referrer || null,
      utmSource: data.utm_source || null,
      utmMedium: data.utm_medium || null,
      utmCampaign: data.utm_campaign || null,
      utmTerm: data.utm_term || null,
      utmContent: data.utm_content || null,
      gclid: data.gclid || null,
      gbraid: data.gbraid || null,
      wbraid: data.wbraid || null,
      ipHash,
      userAgent: request.headers.get("user-agent"),
    })
    .returning();

  await db.insert(inquiryEvents).values({
    inquiryId: inserted.id,
    eventType: "created",
    newValue: "NEW",
  });

  await sendInquiryEmail(inserted);

  return NextResponse.json({ ok: true });
}

async function verifyTurnstile(token: string | undefined, ip: string) {
  if (!token) return false;
  const form = new FormData();
  form.append("secret", process.env.TURNSTILE_SECRET_KEY || "");
  form.append("response", token);
  form.append("remoteip", ip);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
  });
  const body = (await response.json()) as { success?: boolean };
  return Boolean(body.success);
}
