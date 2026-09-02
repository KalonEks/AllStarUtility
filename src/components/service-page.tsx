import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { CippLinkText } from "@/components/cipp-link-text";
import { CtaBand } from "@/components/cta-band";
import { FadeIn, HeroReveal, Stagger, StaggerItem } from "@/components/motion";
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
  ctaTitle?: string;
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

function HeroActions() {
  return (
    <div className="mt-8">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
        <a className="button-secondary" href={`tel:${business.phoneHref}`}>
          <Phone size={18} aria-hidden />
          Call {business.phone}
        </a>
        <Link className="button-primary" href="/contact">
          Request free consultation <ArrowRight size={18} aria-hidden />
        </Link>
      </div>
      <a className="home-hero__emergency" href={`tel:${business.emergencyPhoneHref}`}>
        24/7 Emergency: {business.emergencyPhone}
      </a>
    </div>
  );
}

function ServicesSection({ content }: { content: ServicePageContent }) {
  return (
    <section className="section-flow">
      <div className="container-page grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12">
        <SectionHeading eyebrow="Services" title="Services we offer">
          <p>Sewer and water services to fit the property, the problem, and the condition of the existing line.</p>
          {content.image?.caption ? (
            <p className="mt-5 max-w-md text-sm font-medium leading-6 text-white/55">{content.image.caption}</p>
          ) : null}
        </SectionHeading>
        <ul className="service-list-panel">
          {content.bullets.map((bullet) => (
            <li key={bullet} className="service-list-panel__item">
              <span className="service-list-panel__dot" aria-hidden />
              <span>
                <CippLinkText text={bullet} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PipeLiningCallout({ content }: { content: ServicePageContent }) {
  if (!content.pipeLiningCallout) return null;

  return (
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
          <FadeIn delay={0.1}>
            <figure className="glass-panel overflow-hidden">
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
            </figure>
          </FadeIn>
        ) : null}
      </div>
    </section>
  );
}

function SignsSection({ content }: { content: ServicePageContent }) {
  if (!content.signs) return null;

  return (
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
  );
}

function ProcessSection({ content }: { content: ServicePageContent }) {
  return (
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
  );
}

function ScrollOverSections({ content }: { content: ServicePageContent }) {
  return (
    <>
      <ServicesSection content={content} />
      <PipeLiningCallout content={content} />
      <SignsSection content={content} />
      <ProcessSection content={content} />
      <CtaBand title={content.ctaTitle} />
    </>
  );
}

export function ServicePage({ content }: { content: ServicePageContent }) {
  const hasHeroImage = Boolean(content.image);

  if (hasHeroImage) {
    return (
      <>
        <div className="hero-parallax-fixed" aria-hidden>
          <Image
            src={content.image!.src}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            aria-hidden
          />
          <div className="hero-gradient hero-gradient--flow absolute inset-0" />
        </div>

        <section className="relative z-10 min-h-[85svh]">
          <div className="container-page flex min-h-[85svh] flex-col justify-end pb-16 pt-8 md:justify-center md:pb-24 md:pt-12">
            <HeroReveal className="max-w-4xl">
              <p className="eyebrow">All-Star Utilities</p>
              <h1 className="heading-hero mt-4">{content.title}</h1>
              <p className="text-lead mt-5 max-w-3xl">
                <CippLinkText text={content.intro} />
              </p>
              <HeroActions />
            </HeroReveal>
          </div>
        </section>

        <div className="scroll-over-content relative z-10">
          <ScrollOverSections content={content} />
        </div>
      </>
    );
  }

  return (
    <>
      <section className="section-flow--tight relative overflow-hidden pt-8 md:pt-12">
        <div className="container-page">
          <FadeIn>
            <p className="eyebrow">All-Star Utilities</p>
            <h1 className="heading-display mt-4 max-w-4xl">{content.title}</h1>
            <p className="text-lead mt-5 max-w-3xl">
              <CippLinkText text={content.intro} />
            </p>
            <HeroActions />
          </FadeIn>
        </div>
      </section>

      <ScrollOverSections content={content} />
    </>
  );
}
