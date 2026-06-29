import { ServicePage, serviceMetadata } from "@/components/service-page";

const content = {
  title: "Commercial Sewer & Water",
  description:
    "Commercial sewer and water utility installation, repair, replacement, emergency work, and pipe lining evaluation in the Twin Cities.",
  intro:
    "We work with property owners, managers, developers, contractors, and facilities teams that need sewer and water work planned around access, schedules, and business operations.",
  defaultService: "water-line-replacement",
  bullets: [
    "Commercial sewer line repair and replacement",
    "Commercial water line repair and replacement",
    "New sewer and water utility installation",
    "Emergency sewer and water response",
    "Deep excavation and site utility work",
    "Pipe repairs and pipe segment replacement",
    "Storm sewer repair and replacement",
    "Catch basin repair and replacement",
    "Manhole repair and replacement",
    "Water main utility work",
    "Fire hydrant utility work",
    "CIPP pipe lining as a potential lower-disruption option for qualifying sewer lines",
    "Coordination for access and operational constraints",
    "Project consultation for property managers, developers, and facilities teams",
  ],
  process: [
    "Tell us the property address, use type, urgency, and what access limitations we need to know about.",
    "We review the utility scope, disruption risks, and likely repair paths.",
    "We help plan the next step, whether that is evaluation, excavation, replacement, or pipe lining where suitable.",
  ],
  image: {
    src: "/images/commercial-service.png",
    alt: "Commercial sewer and water utility work with excavation, pipe, and site controls",
    caption: "Commercial utility work needs a plan for access, safety, service continuity, and the least disruptive repair that fits the conditions.",
  },
  pipeLiningCallout: {
    eyebrow: "Lower-disruption repair option",
    title: "Sewer pipe lining can be a fit for some commercial lines",
    body: "When the pipe condition allows it, CIPP lining can reduce excavation and help keep commercial properties moving.",
    href: "/sewer-pipe-lining",
    linkText: "Learn about sewer pipe lining / CIPP",
    image: {
      src: "/images/sewer-liner-install.png",
      alt: "CIPP sewer pipe lining installation diagram showing a liner hose entering an underground sewer pipe",
      caption: "CIPP lining can reduce digging when the existing sewer line is still structurally suitable.",
    },
  },
};

export const metadata = serviceMetadata(content);

export default function CommercialPage() {
  return <ServicePage content={content} />;
}
