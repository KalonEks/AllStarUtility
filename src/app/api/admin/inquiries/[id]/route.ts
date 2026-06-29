import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { inquiries, inquiryEvents } from "@/db/schema";
import { getDb } from "@/lib/db";
import { getSession } from "@/lib/security";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  const { id } = await params;
  const form = await request.formData();
  const status = String(form.get("status") || "NEW") as typeof inquiries.$inferSelect.status;
  const db = getDb();
  const [existing] = await db.select().from(inquiries).where(eq(inquiries.id, id)).limit(1);
  if (existing && existing.status !== status) {
    await db.update(inquiries).set({ status, updatedAt: new Date() }).where(eq(inquiries.id, id));
    await db.insert(inquiryEvents).values({
      inquiryId: id,
      eventType: "status_changed",
      oldValue: existing.status,
      newValue: status,
      createdByUserId: session.userId,
    });
  }
  redirect(`/admin/inquiries/${id}`);
}
