import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { consultationSessionEvents, consultationSessions, inquiries, inquiryEvents } from "@/db/schema";
import { buildInquiryMessage, mergeSessionPayload } from "@/lib/consultation-session";
import { getDb } from "@/lib/db";
import { sendInquiryEmail } from "@/lib/email";
import { hashIp } from "@/lib/security";
import { consultationFormSchema } from "@/lib/validation";

type RouteContext = { params: Promise<{ id: string }> };

const rateLimit = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const raw = await request.json().catch(() => null);
  const parsed = consultationFormSchema.safeParse(raw);
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
  const [session] = await db.select().from(consultationSessions).where(eq(consultationSessions.id, id)).limit(1);
  if (!session || session.status !== "active") {
    return NextResponse.json({ error: "Session not found." }, { status: 404 });
  }

  const merged = mergeSessionPayload(session.payload as Record<string, unknown>, data);
  const validated = consultationFormSchema.safeParse(merged);
  if (!validated.success) {
    return NextResponse.json({ error: "Please complete all steps before submitting." }, { status: 400 });
  }

  const form = validated.data;
  const [inserted] = await db
    .insert(inquiries)
    .values({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      preferredContactMethod: "phone",
      serviceAddress: form.serviceAddress,
      city: form.city,
      state: form.state,
      zip: form.zip,
      propertyType: form.propertyType,
      serviceNeeded: [form.serviceNeeded],
      urgency: form.urgency,
      message: buildInquiryMessage(form),
      currentIssue: form.additionalDetails?.trim() || null,
      source: session.utmSource || null,
      landingPage: session.landingPage || null,
      referrer: session.referrer || null,
      utmSource: session.utmSource || null,
      utmMedium: session.utmMedium || null,
      utmCampaign: session.utmCampaign || null,
      utmTerm: session.utmTerm || null,
      utmContent: session.utmContent || null,
      gclid: session.gclid || null,
      gbraid: session.gbraid || null,
      wbraid: session.wbraid || null,
      ipHash: session.ipHash || ipHash,
      userAgent: session.userAgent || request.headers.get("user-agent"),
    })
    .returning();

  await db.insert(inquiryEvents).values({
    inquiryId: inserted.id,
    eventType: "created",
    newValue: "NEW",
  });

  await db
    .update(consultationSessions)
    .set({
      status: "submitted",
      currentStep: 4,
      maxStepReached: 4,
      payload: form,
      submittedInquiryId: inserted.id,
      updatedAt: new Date(),
    })
    .where(eq(consultationSessions.id, id));

  await db.insert(consultationSessionEvents).values({
    sessionId: id,
    eventType: "submitted",
    step: 4,
  });

  await sendInquiryEmail(inserted);

  return NextResponse.json({ ok: true, inquiryId: inserted.id });
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
