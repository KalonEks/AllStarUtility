import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "All-Star Utilities website terms of use.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="May 14, 2026">
      <p>This website provides general information about All-Star Utilities and its sewer, water, excavation, and pipe lining services.</p>
      <p>Submitting a consultation request does not create a guaranteed appointment, emergency response time, contract, or final estimate.</p>
      <p>These terms should be reviewed and approved before launch.</p>
    </LegalPage>
  );
}
