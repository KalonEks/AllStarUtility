import type { Metadata } from "next";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { InfoHero } from "@/components/info-hero";
import { FadeIn } from "@/components/motion";
import { inquiries, inquiryEvents, inquiryNotes } from "@/db/schema";
import { getDb } from "@/lib/db";
import { getSession } from "@/lib/security";

export const metadata: Metadata = {
  title: "Inquiry Detail",
  robots: { index: false, follow: false },
};

export default async function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  const { id } = await params;
  const db = getDb();
  const [row] = await db.select().from(inquiries).where(eq(inquiries.id, id)).limit(1);
  if (!row) redirect("/admin/inquiries");
  const notes = await db.select().from(inquiryNotes).where(eq(inquiryNotes.inquiryId, id));
  const events = await db.select().from(inquiryEvents).where(eq(inquiryEvents.inquiryId, id));

  return (
    <>
      <InfoHero
        align="center"
        showDivider={false}
        eyebrow="Inquiry detail"
        title={`${row.firstName} ${row.lastName}`}
        description={`${row.serviceAddress}, ${row.city}, ${row.state} ${row.zip}`}
      />
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
                <div className="mt-3 grid gap-3 text-sm leading-6 text-white/82">
                  {events.map((event) => (
                    <p key={event.id}>
                      {event.eventType}: {event.oldValue || ""} {event.newValue || ""}
                    </p>
                  ))}
                  {!events.length ? <p className="text-white/55">No events yet.</p> : null}
                </div>
              </FadeIn>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-wide text-white/55">{label}</p>
      <p className="mt-1 break-words leading-7 text-white/88">{value}</p>
    </div>
  );
}
