import Link from "next/link";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { InfoHero } from "@/components/info-hero";
import { FadeIn } from "@/components/motion";
import { business } from "@/lib/site";

export function LandingPage({ title, copy, defaultService }: { title: string; copy: string; defaultService: string }) {
  return (
    <>
      <InfoHero eyebrow="Free site evaluation" title={title} description={copy} />
      <section className="section-flow">
        <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn className="grid content-start gap-6">
            <div className="glass-panel p-6">
              <p className="font-black text-white">Why call us</p>
              <p className="mt-3 leading-7 text-white/78">
                Family-owned and operated, owner/operator on the job, and a 10-year workmanship guarantee.
              </p>
              <div className="mt-5 grid gap-3">
                <a className="button-primary" href={`tel:${business.phoneHref}`}>Call {business.phone}</a>
                <a className="button-secondary" href={`tel:${business.emergencyPhoneHref}`}>Emergency {business.emergencyPhone}</a>
                <Link className="text-sm font-bold text-[#3b8ff0] hover:text-white" href="/privacy-policy">Privacy policy</Link>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ConsultationForm defaultService={defaultService} />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
