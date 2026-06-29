import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "All-Star Utilities privacy policy for consultation forms, analytics, advertising, and inquiry records.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="May 14, 2026">
      <p>
        All-Star Utilities collects information submitted through consultation forms, including contact details, service address, project details,
        source tracking, and consent records. This information is used to respond to inquiries, evaluate requested services, keep business records,
        and protect against spam or abuse.
      </p>
      <p>
        The site may use analytics, advertising tags, cookies, and click identifiers such as UTM values, GCLID, GBRAID, or WBRAID. These tools should
        be configured only after the business confirms the final analytics and advertising setup.
      </p>
      <p>
        Inquiry records may be stored indefinitely for business history unless we adopt a different retention policy. This draft should be reviewed
        before launch.
      </p>
    </LegalPage>
  );
}
