import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { consultationSessionEvents, consultationSessions } from "@/db/schema";
import { mergeSessionPayload } from "@/lib/consultation-session";
import { getDb } from "@/lib/db";
import {
  personalInfoStepSchema,
  propertyDetailsStepSchema,
  serviceDetailsStepSchema,
  updateSessionSchema,
} from "@/lib/validation";

type RouteContext = { params: Promise<{ id: string }> };

function validateStepData(step: number, data: Record<string, unknown>) {
  if (step === 1) return personalInfoStepSchema.safeParse(data);
  if (step === 2) return propertyDetailsStepSchema.safeParse(data);
  if (step === 3) return serviceDetailsStepSchema.safeParse(data);
  return { success: true as const, data };
}

export async function GET(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const db = getDb();
  const [session] = await db.select().from(consultationSessions).where(eq(consultationSessions.id, id)).limit(1);

  if (!session || session.status !== "active") {
    return NextResponse.json({ error: "Session not found." }, { status: 404 });
  }

  return NextResponse.json({
    sessionId: session.id,
    currentStep: session.currentStep,
    maxStepReached: session.maxStepReached,
    payload: session.payload,
  });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const raw = await request.json().catch(() => null);
  const parsed = updateSessionSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid session update." }, { status: 400 });
  }

  const db = getDb();
  const [existing] = await db.select().from(consultationSessions).where(eq(consultationSessions.id, id)).limit(1);
  if (!existing || existing.status !== "active") {
    return NextResponse.json({ error: "Session not found." }, { status: 404 });
  }

  const stepValidation = parsed.data.eventType === "step_completed" ? validateStepData(parsed.data.step, parsed.data.data) : { success: true as const, data: parsed.data.data };
  if (!stepValidation.success) {
    return NextResponse.json({ error: "Please check the required fields and try again." }, { status: 400 });
  }

  const payload = mergeSessionPayload(existing.payload as Record<string, unknown>, parsed.data.data);
  const nextStep =
    parsed.data.eventType === "step_back"
      ? Math.max(parsed.data.step - 1, 1)
      : Math.min(parsed.data.step + 1, 4);

  await db
    .update(consultationSessions)
    .set({
      payload,
      currentStep: nextStep,
      maxStepReached: Math.max(existing.maxStepReached, nextStep),
      updatedAt: new Date(),
    })
    .where(eq(consultationSessions.id, id));

  await db.insert(consultationSessionEvents).values({
    sessionId: id,
    eventType: parsed.data.eventType,
    step: parsed.data.step,
  });

  return NextResponse.json({ sessionId: id, currentStep: nextStep, payload });
}
