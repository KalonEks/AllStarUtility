import type { Metadata } from "next";
import { CippLinkText } from "@/components/cipp-link-text";
import { InfoHero } from "@/components/info-hero";
import { FadeIn } from "@/components/motion";
import { faqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Common questions about All-Star Utilities sewer, water, excavation, and pipe lining services.",
};

export default function FaqPage() {
  return (
    <>
      <InfoHero
        eyebrow="FAQ"
        title="Common customer questions"
        description="Straight answers about sewer, water, excavation, and pipe lining work before you request a consultation."
      />
      <section className="section-flow">
        <div className="container-page grid gap-4">
          {faqs.map((faq, index) => (
            <FadeIn key={`${faq.category}-${faq.question}`} delay={index * 0.04}>
              <details className="glass-panel group p-5">
                <summary className="flex cursor-pointer list-none items-start gap-3 text-lg font-black text-white [&::-webkit-details-marker]:hidden">
                  <span className="eyebrow shrink-0">{faq.category}</span>
                  <span className="flex-1">{faq.question}</span>
                </summary>
                <p className="mt-4 leading-7 text-white/72">
                  <CippLinkText text={faq.answer} />
                </p>
              </details>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
