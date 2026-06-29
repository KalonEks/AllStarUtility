import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "Sewer Line Repair Twin Cities",
  description: "Request a free sewer line repair consultation from All-Star Utilities in the Twin Cities metro.",
};

export default function Page() {
  return (
    <LandingPage
      title="Sewer line repair in the Twin Cities"
      copy="Recurring backups, sewer smells, root intrusion, cracked pipe, and city notices deserve a practical evaluation before the repair path is chosen."
      defaultService="sewer-line-repair"
    />
  );
}
