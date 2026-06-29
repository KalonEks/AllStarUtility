import type { Metadata } from "next";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { inquiries, inquiryEvents, inquiryNotes } from "@/db/schema";
import { getDb } from "@/lib/db";
import { getSession } from "@/lib/security";

export const metadata: Metadata = {
  title: "Inquiry Detail",
  robots: { index: false, follow: false },
};

export default async function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) redirect("/owner/login");
  const { id } = await params;
  const db = getDb();
  const [row] = await db.select().from(inquiries).where(eq(inquiries.id, id)).limit(1);
  if (!row) redirect("/owner/inquiries");
  const notes = await db.select().from(inquiryNotes).where(eq(inquiryNotes.inquiryId, id));
  const events = await db.select().from(inquiryEvents).where(eq(inquiryEvents.inquiryId, id));

  return (
    <section className="section-pad">
      <div className="container-page grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <h1 className="text-4xl font-black text-[#06111f]">{row.firstName} {row.lastName}</h1>
          <p className="mt-2 text-[#475569]">{row.serviceAddress}, {row.city}, {row.state} {row.zip}</p>
          <div className="mt-6 grid gap-4 rounded-lg border border-[#d7dde7] bg-white p-5">
            <Field label="Phone" value={row.phone} />
            <Field label="Email" value={row.email} />
            <Field label="Preferred contact" value={row.preferredContactMethod} />
            <Field label="Property type" value={row.propertyType} />
            <Field label="Service needed" value={row.serviceNeeded.join(", ")} />
            <Field label="Urgency" value={row.urgency} />
            <Field label="Message" value={row.message} />
            <Field label="Current issue" value={row.currentIssue || "Not provided"} />
            <Field label="Best contact time" value={row.bestContactTime || "Not provided"} />
            <Field label="Source" value={row.utmSource || row.source || "Not captured"} />
            <Field label="Landing page" value={row.landingPage || "Not captured"} />
            <Field label="Referrer" value={row.referrer || "Not captured"} />
            <Field label="Click IDs" value={[row.gclid, row.gbraid, row.wbraid].filter(Boolean).join(", ") || "Not captured"} />
            <Field label="IP hash" value={row.ipHash || "Not captured"} />
            <Field label="User agent" value={row.userAgent || "Not captured"} />
          </div>
        </div>
        <aside className="grid content-start gap-5">
          <form action={`/api/admin/inquiries/${row.id}`} method="post" className="grid gap-3 rounded-lg border border-[#d7dde7] bg-white p-5">
            <label className="label">
              Status
              <select className="field" name="status" defaultValue={row.status}>
                {["NEW", "CONTACTED", "SCHEDULED", "ESTIMATE_SENT", "WON", "LOST", "SPAM", "ARCHIVED"].map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>
            <button className="button-primary" type="submit">Update status</button>
          </form>
          <form action={`/api/admin/inquiries/${row.id}/notes`} method="post" className="grid gap-3 rounded-lg border border-[#d7dde7] bg-white p-5">
            <label className="label">
              Internal note
              <textarea className="field min-h-28" name="note" required />
            </label>
            <button className="button-secondary" type="submit">Add note</button>
          </form>
          <div className="rounded-lg border border-[#d7dde7] bg-white p-5">
            <h2 className="font-black text-[#06111f]">Notes</h2>
            <div className="mt-3 grid gap-3 text-sm">
              {notes.map((note) => <p key={note.id}>{note.note}</p>)}
              {!notes.length ? <p>No notes yet.</p> : null}
            </div>
          </div>
          <div className="rounded-lg border border-[#d7dde7] bg-white p-5">
            <h2 className="font-black text-[#06111f]">Events</h2>
            <div className="mt-3 grid gap-3 text-sm">
              {events.map((event) => <p key={event.id}>{event.eventType}: {event.oldValue || ""} {event.newValue || ""}</p>)}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-wide text-[#64748b]">{label}</p>
      <p className="mt-1 break-words leading-7 text-[#172033]">{value}</p>
    </div>
  );
}
