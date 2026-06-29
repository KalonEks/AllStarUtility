import { redirect } from "next/navigation";
import { inquiryEvents, inquiryNotes } from "@/db/schema";
import { getDb } from "@/lib/db";
import { getSession } from "@/lib/security";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  const { id } = await params;
  const form = await request.formData();
  const note = String(form.get("note") || "").trim();
  if (note) {
    const db = getDb();
    await db.insert(inquiryNotes).values({ inquiryId: id, authorUserId: session.userId, note });
    await db.insert(inquiryEvents).values({
      inquiryId: id,
      eventType: "note_added",
      createdByUserId: session.userId,
    });
  }
  redirect(`/admin/inquiries/${id}`);
}
