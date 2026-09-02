import { and, eq, gte, notInArray } from "drizzle-orm";
import { NextResponse } from "next/server";
import { inquiries } from "@/db/schema";
import { getDb } from "@/lib/db";
import { addressMatchKey } from "@/lib/sanitize";
import { business } from "@/lib/site";

const DUPLICATE_ADDRESS_WINDOW_DAYS = 30;

export const duplicateAddressCopy = `An inquiry has already been submitted for this address. If this isn't correct, please call ${business.phone}.`;

export function duplicateAddressResponse() {
  return NextResponse.json(
    {
      error: duplicateAddressCopy,
      code: "duplicate_address",
      phone: business.phone,
    },
    { status: 409 },
  );
}

export async function hasSubmittedInquiryForAddress(address: {
  serviceAddress: string;
  city: string;
  state: string;
  zip: string;
}) {
  const target = addressMatchKey(address);
  if (!target) return false;

  const since = new Date(Date.now() - DUPLICATE_ADDRESS_WINDOW_DAYS * 24 * 60 * 60 * 1000);
  const db = getDb();
  const rows = await db
    .select({
      serviceAddress: inquiries.serviceAddress,
      city: inquiries.city,
      state: inquiries.state,
      zip: inquiries.zip,
    })
    .from(inquiries)
    .where(
      and(
        eq(inquiries.zip, address.zip),
        gte(inquiries.createdAt, since),
        notInArray(inquiries.status, ["SPAM", "ARCHIVED"]),
      ),
    );

  return rows.some((row) => addressMatchKey(row) === target);
}
