import type { Metadata } from "next";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { InfoHero } from "@/components/info-hero";
import { FadeIn } from "@/components/motion";
import { business } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a free All-Star Utilities consultation for sewer, water, excavation, or pipe lining work.",
};

export default function ContactPage() {
  return (
    <>
      <InfoHero
        align="center"
        showDivider={false}
        className="contact-page-hero"
        eyebrow="Schedule your free consultation"
        title="Tell us what is happening at the property"
        description={
          <>
            Use the form for project planning, quotes, and non-immediate requests. For active emergencies, call the
            emergency number.{" "}
            <a
              className="font-bold text-[var(--brand)] no-underline transition hover:text-[var(--brand-soft)]"
              href={`tel:${business.emergencyPhoneHref}`}
            >
              {business.emergencyPhone}
            </a>
          </>
        }
      />
      <section className="section-flow contact-page-form">
        <div className="container-page mx-auto max-w-3xl">
          <FadeIn>
            <ConsultationForm />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
