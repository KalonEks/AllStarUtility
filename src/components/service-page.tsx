import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { CippLinkText } from "@/components/cipp-link-text";
import { CtaBand } from "@/components/cta-band";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { business } from "@/lib/site";

export type ServicePageContent = {
  title: string;
  description: string;
  intro: string;
  bullets: string[];
  signs?: string[];
  process: string[];
  defaultService?: string;
  image?: { src: string; alt: string; caption: string };
  pipeLiningCallout?: {
    eyebrow: string;
    title: string;
    body: string;
    href: string;
    linkText: string;
    image?: { src: string; alt: string; caption: string };
  };
};

export function serviceMetadata(content: ServicePageContent): Metadata {
  return { title: content.title, description: content.description };
}

export function ServicePage({ content }: { content: ServicePageContent }) {
  return (
    <>
      <section className="section-flow--tight relative overflow-hidden pt-8 md:pt-12">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_340px] lg:items-center">
          <FadeIn>
            <p className="eyebrow">All-Star Utilities</p>
            <h1 className="heading-display mt-4 max-w-4xl">{content.title}</h1>
            <p className="text-lead mt-5 max-w-3xl">
              <CippLinkText text={content.intro} />
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="glass-panel glass-panel--light p-6">
            <p className="eyebrow">Information page</p>
            <h2 className="mt-3 text-2xl font-black text-white">Need pricing or a site review?</h2>
            <p className="mt-3 leading-7 text-white/72">Send us the property details when you are ready.</p>
            <div className="mt-6 grid gap-3">
              <Link className="button-primary" href="/contact">
                Request Free Consultation <ArrowRight size={18} aria-hidden />
              </Link>
              <a className="button-secondary" href={`tel:${business.phoneHref}`}>
                <Phone size={18} aria-hidden /> Call {business.phone}
              </a>
            </div>
          </FadeIn>
        </div>
        <div className="flow-divider container-page mt-10" />
      </section>

      <section className="service-image-band section-flow">
        {content.image ? (
          <Image src={content.image.src} alt="" fill className="object-cover" sizes="100vw" aria-hidden />
        ) : null}
        <div className="container-page relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="Services" title="Services we offer">
            <p>Sewer and water services to fit the property, the problem, and the condition of the existing line.</p>
          </SectionHeading>
          <div className="glass-panel overflow-hidden">
            {content.bullets.map((bullet) => (
              <div key={bullet} className="flex gap-3 border-b border-white/10 px-5 py-4 font-bold leading-6 text-white/88 last:border-b-0">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#d71920]" aria-hidden />
                <span>
                  <CippLinkText text={bullet} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {content.pipeLiningCallout ? (
        <section className="section-flow">
          <div className="container-page grid items-center gap-8 lg:grid-cols-[1fr_0.95fr]">
            <FadeIn>
              <p className="eyebrow">{content.pipeLiningCallout.eyebrow}</p>
              <h2 className="heading-section mt-3">{content.pipeLiningCallout.title}</h2>
              <p className="text-lead mt-4">
                <CippLinkText text={content.pipeLiningCallout.body} />
              </p>
              <Link className="button-ghost mt-6" href={content.pipeLiningCallout.href}>
                {content.pipeLiningCallout.linkText} <ArrowRight size={18} aria-hidden />
              </Link>
            </FadeIn>
            {content.pipeLiningCallout.image ? (
              <FadeIn delay={0.1} className="glass-panel overflow-hidden">
                <Image
                  src={content.pipeLiningCallout.image.src}
                  alt={content.pipeLiningCallout.image.alt}
                  width={900}
                  height={520}
                  className="aspect-[16/10] w-full object-cover"
                />
                <figcaption className="border-t border-white/10 px-5 py-4 text-sm font-bold text-white/72">
                  {content.pipeLiningCallout.image.caption}
                </figcaption>
              </FadeIn>
            ) : null}
          </div>
        </section>
      ) : null}

      {content.signs ? (
        <section className="section-flow">
          <div className="container-page">
            <SectionHeading align="center" eyebrow="When to call" title="Signs it is time to request an evaluation" />
            <Stagger className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {content.signs.map((sign) => (
                <StaggerItem
                  key={sign}
                  className="glass-panel flex h-24 w-full items-center justify-center p-4 text-center text-sm font-bold leading-6 text-white/88"
                >
                  <CippLinkText text={sign} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      ) : null}

      <section className="section-flow">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="Process" title="How the free evaluation works" />
          <Stagger className="mt-8 grid gap-4 md:grid-cols-3">
            {content.process.map((step, index) => (
              <StaggerItem key={step} className="glass-panel p-5 text-center">
                <span className="text-sm font-black text-[#d71920]">Step {index + 1}</span>
                <p className="mt-3 font-bold leading-7 text-white/88">
                  <CippLinkText text={step} />
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
