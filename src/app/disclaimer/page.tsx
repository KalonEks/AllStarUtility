import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "All-Star Utilities website disclaimer.",
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updated="May 14, 2026">
      <p>Website content is educational and based on currently provided business information. Actual repair recommendations require evaluation.</p>
      <p>Emergency requests should be made by phone. The form is not a substitute for calling the 24/7 emergency number.</p>
      <p>Licenses, certifications, warranties, financing references, service areas, and business hours should be confirmed before launch.</p>
    </LegalPage>
  );
}
