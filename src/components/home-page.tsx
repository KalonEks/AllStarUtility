"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { FadeIn, HeroReveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { homeFeatured, homeLining } from "@/lib/content";
import { business } from "@/lib/site";

const [warrantyValue, ...warrantyLabelParts] = business.warranty.split(" ");
const warrantyLabel = warrantyLabelParts.join(" ");

const trustFacts = [
  { value: business.founded, label: "Founded" },
  { value: "Family-owned", label: "and operated" },
  { value: "Experienced Professionals", label: "that get the job done" },
  { value: warrantyValue, label: warrantyLabel },
];

function HomePath({ item }: { item: (typeof homeFeatured)[number] }) {
  return (
    <article className="home-path">
      <figure className="home-path__figure">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          className="home-path__img object-cover"
          sizes="(min-width: 1024px) 720px, 100vw"
        />
      </figure>
      <div className="home-path__copy">
        <h3>
          <Link href={item.href} className="home-path__title">
            {item.title}
          </Link>
        </h3>
        <p className="text-lead mt-4">{item.summary}</p>
        <Link className="button-ghost mt-5" href={item.href}>
          {item.ctaLabel} <ArrowRight size={18} aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export function HomePage() {
  return (
    <>
      <section className="home-hero" aria-label="Introduction">
        <div className="home-hero__media">
          <Image
            src="/images/home-hero-pvc.png"
            alt="Overcast Twin Cities job site: a sheet-steel trench box in a front-yard excavation with white PVC sewer pipe on gravel, a mini-excavator, and a crew member at the rim."
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="home-hero__scrim" aria-hidden />
        <div className="container-page home-hero__inner">
          <HeroReveal className="home-hero__content">
            <p className="eyebrow">{business.tagline}</p>
            <h1 className="heading-hero mt-4">Twin Cities sewer and water specialists.</h1>
            <p className="text-lead mt-5">
              Over 20 years of sewer, water, and excavation experience. Family-owned since {business.founded}, with an
              owner/operator involved on the job and a crew that shows up.
            </p>
            <div className="home-hero__actions">
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
          </HeroReveal>
        </div>
      </section>

      <section className="home-trust" aria-label="Company facts">
        <FadeIn>
          <div className="container-page">
            <div className="home-trust__grid">
              {trustFacts.map((fact) => (
                <div key={fact.label} className="home-trust__item">
                  <p className="home-trust__value">{fact.value}</p>
                  <p className="home-trust__label">{fact.label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="section-flow bg-[var(--bg-deep)]">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="Our Services" eyebrowClassName="eyebrow--lg" title="Residential or Commercial.">
            <p>
              Those are the two kinds of jobs. On either one we can repair, replace, excavate, or line it from the
              inside if the sewer qualifies.
            </p>
          </SectionHeading>
          <Stagger className="home-paths">
            {homeFeatured.map((item) => (
              <StaggerItem key={item.href}>
                <HomePath item={item} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-flow home-lining" aria-label="Pipe lining option">
        <div className="container-page home-lining__inner">
          <SectionHeading align="center" eyebrow={homeLining.eyebrow} title={homeLining.title}>
            <p>{homeLining.summary}</p>
          </SectionHeading>
          <FadeIn className="home-lining__follow">
            <figure className="home-lining__figure">
              <Image
                src={homeLining.image.src}
                alt={homeLining.image.alt}
                width={900}
                height={560}
                className="home-lining__img"
                sizes="(min-width: 1024px) 640px, 100vw"
              />
              <figcaption className="home-lining__caption">{homeLining.caption}</figcaption>
            </figure>
            <Link className="button-ghost home-lining__cta" href={homeLining.href}>
              {homeLining.ctaLabel} <ArrowRight size={18} aria-hidden />
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="section-flow home-credentials">
        <div className="container-page home-credentials__inner">
          <FadeIn>
            <p className="eyebrow">Credentials</p>
            <h2 className="heading-section mt-3">Licensed, bonded, certified.</h2>
            <ul className="home-credentials__list">
              {business.credentials.map((credential) => (
                <li key={credential}>{credential}</li>
              ))}
            </ul>
            <Link className="button-ghost mt-6" href="/about">
              About All-Star Utilities <ArrowRight size={18} aria-hidden />
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="home-cta">
        <FadeIn className="container-page home-cta__inner">
          <h2 className="heading-section">Request a free site evaluation</h2>
          <p className="text-lead mt-4">
            Send the address, what is happening, and how urgent it is. We serve Minneapolis, St. Paul, and surrounding
            neighborhoods.
          </p>
          <div className="home-cta__actions">
            <Link className="button-primary" href="/contact">
              Free consultation
            </Link>
            <a className="button-secondary" href={`tel:${business.phoneHref}`}>
              <Phone size={18} aria-hidden />
              Call {business.phone}
            </a>
            <Link className="button-ghost" href="/service-areas">
              <MapPin size={18} aria-hidden />
              View Service Areas
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
