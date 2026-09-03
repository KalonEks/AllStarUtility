import type { Metadata } from "next";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/motion";
import { inquiries, inquiryEvents, inquiryNotes, users } from "@/db/schema";
import { getDb } from "@/lib/db";
import { formatHowHeard, formatInquiryMessage, formatInquiryStatus, formatPropertyType, formatServiceNeeded, formatUrgency, toTitleCase } from "@/lib/display-format";
import { getSession } from "@/lib/security";
import { formatUsNationalPhone } from "@/lib/us-contact";

export const metadata: Metadata = {
  title: "Inquiry Detail",
  robots: { index: false, follow: false },
};

export default async function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) redirect("/admin");
  const { id } = await params;
  const db = getDb();
  const [row] = await db.select().from(inquiries).where(eq(inquiries.id, id)).limit(1);
  if (!row) redirect("/admin/inquiries");
  const notes = await db.select().from(inquiryNotes).where(eq(inquiryNotes.inquiryId, id));
  const events = await db
    .select({
      id: inquiryEvents.id,
      eventType: inquiryEvents.eventType,
      oldValue: inquiryEvents.oldValue,
      newValue: inquiryEvents.newValue,
      createdAt: inquiryEvents.createdAt,
      adminEmail: users.email,
    })
    .from(inquiryEvents)
    .leftJoin(users, eq(inquiryEvents.createdByUserId, users.id))
    .where(eq(inquiryEvents.inquiryId, id))
    .orderBy(desc(inquiryEvents.createdAt));

  return (
    <section className="section-flow contact-page-form">
      <div className="container-page">
        <FadeIn>
          <Link className="button-secondary button-secondary--brand mb-6 inline-flex" href="/admin/inquiries">
            <ArrowLeft size={18} aria-hidden />
            Back to inquiries
          </Link>
        </FadeIn>
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <FadeIn className="glass-panel grid gap-4 p-5 md:p-6">
            <Field label="Name" value={toTitleCase(`${row.firstName} ${row.lastName}`)} />
            <Field label="Service address" value={`${row.serviceAddress}, ${toTitleCase(row.city)}, ${row.state} ${row.zip}`} />
            <Field label="Phone" value={formatUsNationalPhone(row.phone)} />
            <Field label="Email" value={row.email} />
            <Field label="Preferred contact" value={toTitleCase(row.preferredContactMethod)} />
            <Field label="Property type" value={formatPropertyType(row.propertyType)} />
            <Field label="Service needed" value={row.serviceNeeded.map(formatServiceNeeded).join(", ")} />
            <Field label="Urgency" value={formatUrgency(row.urgency)} />
            <Field label="Status" value={formatInquiryStatus(row.status)} />
            <Field label="Message" value={formatInquiryMessage(row.message, row.currentIssue)} />
            <Field label="Additional details" value={row.currentIssue || "Not provided"} />
            <Field label="Referral" value={row.howHeard ? formatHowHeard(row.howHeard) : "Not provided"} />
          </FadeIn>
          <aside className="grid content-start gap-5">
            <FadeIn delay={0.05}>
              <form action={`/api/admin/inquiries/${row.id}`} method="post" className="glass-panel grid gap-3 p-5 md:p-6">
                <label className="label">
                  Status
                  <select className="field" name="status" defaultValue={row.status}>
                    {["NEW", "CONTACTED", "SCHEDULED", "ESTIMATE_SENT", "WON", "LOST", "SPAM", "ARCHIVED"].map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </label>
                <button className="button-primary justify-center" type="submit">
                  Update status
                </button>
              </form>
            </FadeIn>
            <FadeIn delay={0.1}>
              <form action={`/api/admin/inquiries/${row.id}/notes`} method="post" className="glass-panel grid gap-3 p-5 md:p-6">
                <label className="label">
                  Internal note
                  <textarea className="field min-h-28" name="note" required />
                </label>
                <button className="button-secondary justify-center" type="submit">
                  Add note
                </button>
              </form>
            </FadeIn>
            <FadeIn delay={0.15} className="glass-panel p-5 md:p-6">
              <h2 className="heading-section text-2xl">Notes</h2>
              <div className="mt-3 grid gap-3 text-sm leading-6 text-white/82">
                {notes.map((note) => (
                  <p key={note.id}>{note.note}</p>
                ))}
                {!notes.length ? <p className="text-white/55">No notes yet.</p> : null}
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="glass-panel p-5 md:p-6">
              <h2 className="heading-section text-2xl">Events</h2>
              <div className="mt-3 grid gap-3 text-xs leading-5 text-white/82">
                {events.map((event) => (
                  <div key={event.id}>
                    <p>{formatEventSummary(event.eventType, event.oldValue, event.newValue)}</p>
                    <p className="mt-0.5 break-words italic text-white/65">
                      {event.adminEmail || "System"} · {formatEventTimestamp(event.createdAt)}
                    </p>
                  </div>
                ))}
                {!events.length ? <p className="text-white/55">No events yet.</p> : null}
              </div>
            </FadeIn>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[var(--brand)]">{label}</p>
      <p className="mt-1 break-words italic leading-7 text-white/88">{value}</p>
    </div>
  );
}

function formatEventSummary(eventType: string, oldValue: string | null, newValue: string | null) {
  if (eventType === "status_changed") {
    return `${formatInquiryStatus(oldValue || "")} → ${formatInquiryStatus(newValue || "")}`;
  }
  if (eventType === "created") {
    return `Created (${formatInquiryStatus(newValue || "NEW")})`;
  }
  if (eventType === "note_added") {
    return "Note added";
  }
  return toTitleCase(eventType.replace(/_/g, " "));
}

function formatEventTimestamp(value: Date) {
  return value.toLocaleString("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  });
}
