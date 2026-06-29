import { NextRequest, NextResponse } from "next/server";
import { consultationSessionEvents, consultationSessions } from "@/db/schema";
import { mergeSessionPayload, trackingFromBody } from "@/lib/consultation-session";
import { getDb } from "@/lib/db";
import { hashIp } from "@/lib/security";
import { createSessionSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const raw = await request.json().catch(() => null);
  const parsed = createSessionSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please complete the personal information fields." }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ipHash = hashIp(ip);
  const db = getDb();

  const [session] = await db
    .insert(consultationSessions)
    .values({
      currentStep: 2,
      maxStepReached: 2,
      payload: parsed.data.data,
      ipHash,
      userAgent: request.headers.get("user-agent"),
      ...trackingFromBody(parsed.data),
    })
    .returning();

  await db.insert(consultationSessionEvents).values({
    sessionId: session.id,
    eventType: "step_completed",
    step: 1,
    metadata: "Personal Information",
  });

  return NextResponse.json({ sessionId: session.id, currentStep: session.currentStep });
}
