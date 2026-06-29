import type { Metadata } from "next";
import { desc, ilike, or } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { InfoHero } from "@/components/info-hero";
import { FadeIn } from "@/components/motion";
import { inquiries } from "@/db/schema";
import { getDb } from "@/lib/db";
import { getSession } from "@/lib/security";

export const metadata: Metadata = {
  title: "Inquiries",
  robots: { index: false, follow: false },
};

export default async function InquiriesPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  const { q = "" } = await searchParams;
  const db = getDb();
  const rows = await db
    .select()
    .from(inquiries)
    .where(
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
    )
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
            <form className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <input className="field sm:min-w-72" name="q" defaultValue={q} placeholder="Search inquiries" />
              <button className="button-primary justify-center sm:min-w-32" type="submit">
                Search
              </button>
            </form>
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
                      <td>{row.createdAt.toLocaleDateString()}</td>
                      <td className="font-bold">
                        <Link className="text-[#3b8ff0] no-underline transition hover:text-white" href={`/admin/inquiries/${row.id}`}>
                          {row.firstName} {row.lastName}
                        </Link>
                      </td>
                      <td>
                        {row.phone}
                        <br />
                        {row.email}
                      </td>
                      <td>{row.serviceNeeded.join(", ")}</td>
                      <td>{row.urgency}</td>
                      <td>{row.status}</td>
                      <td>{row.city}</td>
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
