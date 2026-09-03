import type { ReactNode } from "react";
import type { Metadata } from "next";
import { and, desc, eq, ilike, or, sql } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { InquiryFilters } from "@/components/admin/inquiry-filters";
import { InfoHero } from "@/components/info-hero";
import { FadeIn } from "@/components/motion";
import { inquiries } from "@/db/schema";
import { serviceNeededOptions, urgencyOptions } from "@/lib/content";
import { getDb } from "@/lib/db";
import { formatInquiryStatus, formatServiceNeeded, formatUrgency, toTitleCase } from "@/lib/display-format";
import { getSession } from "@/lib/security";
import { formatUsNationalPhone } from "@/lib/us-contact";

const inquiryStatuses = ["NEW", "CONTACTED", "SCHEDULED", "ESTIMATE_SENT", "WON", "LOST", "SPAM", "ARCHIVED"] as const;

function allowedValue(value: string | undefined, allowed: readonly string[]) {
  return value && allowed.includes(value) ? value : "";
}

export const metadata: Metadata = {
  title: "Inquiries",
  robots: { index: false, follow: false },
};

export default async function InquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; service?: string; urgency?: string; status?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin");
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const service = allowedValue(params.service, serviceNeededOptions.map(([value]) => value));
  const urgency = allowedValue(params.urgency, urgencyOptions.map(([value]) => value));
  const status = allowedValue(params.status, inquiryStatuses);
  const filters = [
    q
      ? or(
          ilike(inquiries.firstName, `%${q}%`),
          ilike(inquiries.lastName, `%${q}%`),
          ilike(inquiries.email, `%${q}%`),
          ilike(inquiries.phone, `%${q}%`),
          ilike(inquiries.city, `%${q}%`),
          ilike(inquiries.serviceAddress, `%${q}%`),
        )
      : undefined,
    service ? sql`${inquiries.serviceNeeded} @> ARRAY[${service}]::text[]` : undefined,
    urgency ? eq(inquiries.urgency, urgency) : undefined,
    status ? eq(inquiries.status, status as (typeof inquiryStatuses)[number]) : undefined,
  ].filter(Boolean);
  const db = getDb();
  const rows = await db
    .select()
    .from(inquiries)
    .where(filters.length ? and(...filters) : undefined)
    .orderBy(desc(inquiries.createdAt))
    .limit(100);

  return (
    <>
      <InfoHero
        align="center"
        showDivider={false}
        eyebrow="Admin dashboard"
        title="Consultation inquiries"
        description="Newest 100 records. Search matches name, email, phone, city, or address."
      />
      <section className="section-flow contact-page-form">
        <div className="container-page">
          <FadeIn className="glass-panel grid gap-5 p-5 md:p-6">
            <InquiryFilters
              q={q}
              service={service}
              urgency={urgency}
              status={status}
              serviceOptions={serviceNeededOptions}
              urgencyOptions={urgencyOptions}
              statusOptions={inquiryStatuses}
            />
            <div className="overflow-x-auto rounded-lg border border-white/10">
              <table className="admin-table w-full min-w-[920px] text-left text-sm">
                <thead>
                  <tr>
                    <th>Created</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Service</th>
                    <th>Urgency</th>
                    <th>Status</th>
                    <th>City</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <RowLinkCell href={`/admin/inquiries/${row.id}`}>{row.createdAt.toLocaleDateString()}</RowLinkCell>
                      <RowLinkCell href={`/admin/inquiries/${row.id}`} className="font-bold text-[#3b8ff0]">
                        {toTitleCase(`${row.firstName} ${row.lastName}`)}
                      </RowLinkCell>
                      <RowLinkCell href={`/admin/inquiries/${row.id}`}>
                        <>
                          {formatUsNationalPhone(row.phone)}
                          <br />
                          {row.email}
                        </>
                      </RowLinkCell>
                      <RowLinkCell href={`/admin/inquiries/${row.id}`}>{row.serviceNeeded.map(formatServiceNeeded).join(", ")}</RowLinkCell>
                      <RowLinkCell href={`/admin/inquiries/${row.id}`}>{formatUrgency(row.urgency)}</RowLinkCell>
                      <RowLinkCell href={`/admin/inquiries/${row.id}`}>{formatInquiryStatus(row.status)}</RowLinkCell>
                      <RowLinkCell href={`/admin/inquiries/${row.id}`}>{toTitleCase(row.city)}</RowLinkCell>
                    </tr>
                  ))}
                  {!rows.length ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-white/55">
                        No inquiries found.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

function RowLinkCell({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <td>
      <Link className={`-m-3 block p-3 no-underline transition hover:text-white ${className || ""}`.trim()} href={href}>
        {children}
      </Link>
    </td>
  );
}
