import { ServicePage, serviceMetadata } from "@/components/service-page";

const content = {
  title: "Residential Sewer & Water",
  description:
    "Residential sewer and water repair, replacement, installation, excavation, and pipe lining evaluation in the Twin Cities metro.",
  intro:
    "We help homeowners figure out what is happening underground before a sewer or water problem turns into a bigger repair.",
  defaultService: "sewer-line-repair",
  bullets: [
    "Sewer line repair and replacement",
    "Water line repair and replacement",
    "New sewer and water line installation",
    "Sewer lateral evaluation and repair planning",
    "CIPP sewer pipe lining where the existing pipe qualifies",
    "Pipe repairs and pipe segment replacement",
    "Deep sewer excavation and water pipe excavation",
    "Storm sewer repair and replacement",
    "Catch basin repair and replacement",
    "Manhole repair and replacement where applicable",
    "Water main and fire hydrant utility work where applicable",
    "Excavation for sand rock, deep sewer, and deep tunnel conditions",
    "Free site evaluation for planning the right repair",
  ],
  signs: [
    "Slow drains or recurring clogs",
    "Sewer smell, backups, or active water service issues",
    "Pooling water, visible sinkholes, or soft ground",
    "Known root intrusion",
    "Old clay, cast iron, or damaged pipe",
    "City notice or required utility correction",
  ],
  process: [
    "Send us the address, what you are seeing, and how urgent it is.",
    "We review the site conditions, access, and repair options with you.",
    "We walk you through whether excavation, replacement, pipe lining, or more evaluation makes sense.",
  ],
  image: {
    src: "/images/residential-service.png",
    alt: "Residential sewer and water line replacement with an excavated trench and utility pipe",
    caption: "Residential sewer and water work often comes down to careful access, clean excavation, and choosing the right repair path.",
  },
  pipeLiningCallout: {
    eyebrow: "Pipe lining option",
    title: "Sewer pipe lining may be available for residential sewer lines",
    body: "If the existing sewer line is still a good candidate, CIPP lining can restore the inside of the pipe with less digging than full open replacement.",
    href: "/sewer-pipe-lining",
    linkText: "Learn about sewer pipe lining / CIPP",
    image: {
      src: "/images/sewer-liner-install.png",
      alt: "CIPP sewer pipe lining installation diagram showing a liner hose entering an underground sewer pipe",
      caption: "CIPP lining is installed through an access point so the liner can cure inside a qualifying existing sewer line.",
    },
  },
};

export const metadata = serviceMetadata(content);

export default function ResidentialPage() {
  return <ServicePage content={content} />;
}
