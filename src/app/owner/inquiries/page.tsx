import type { Metadata } from "next";
import { desc, ilike, or } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { inquiries } from "@/db/schema";
import { getDb } from "@/lib/db";
import { getSession } from "@/lib/security";

export const metadata: Metadata = {
  title: "Inquiries",
  robots: { index: false, follow: false },
};

export default async function InquiriesPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const session = await getSession();
  if (!session) redirect("/owner/login");
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
    <div className="admin-surface min-h-[60vh]">
      <section className="section-pad">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-4xl font-black text-[#06111f]">Consultation inquiries</h1>
              <p className="mt-2 text-[#475569]">Newest 100 records. Search matches name, email, phone, city, or address.</p>
            </div>
            <form className="flex gap-2">
              <input className="field min-w-72" name="q" defaultValue={q} placeholder="Search inquiries" />
              <button className="button-primary" type="submit">Search</button>
            </form>
          </div>
          <div className="mt-8 overflow-x-auto rounded-lg border border-[#d7dde7] bg-white">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead className="bg-[#eef3fb] text-[#172033]">
                <tr>
                  <th className="p-3">Created</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Urgency</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">City</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-t border-[#d7dde7]">
                    <td className="p-3">{row.createdAt.toLocaleDateString()}</td>
                    <td className="p-3 font-bold">
                      <Link href={`/owner/inquiries/${row.id}`}>{row.firstName} {row.lastName}</Link>
                    </td>
                    <td className="p-3">{row.phone}<br />{row.email}</td>
                    <td className="p-3">{row.serviceNeeded.join(", ")}</td>
                    <td className="p-3">{row.urgency}</td>
                    <td className="p-3">{row.status}</td>
                    <td className="p-3">{row.city}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
