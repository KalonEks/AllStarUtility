import { Building2, Clock, Droplets, HardHat, Home, ShieldCheck, Wrench } from "lucide-react";

export const services = [
  {
    title: "Residential Sewer & Water",
    href: "/residential-sewer-water",
    icon: Home,
    summary:
      "We repair, replace, install, and evaluate residential sewer laterals, water lines, storm sewer needs, and related utility work.",
  },
  {
    title: "Commercial Sewer & Water",
    href: "/commercial-sewer-water",
    icon: Building2,
    summary:
      "Sewer and water work for property owners, managers, developers, contractors, and facilities teams, planned to limit disruption.",
  },
  {
    title: "Sewer Pipe Lining / CIPP",
    href: "/sewer-pipe-lining",
    icon: ShieldCheck,
    summary:
      "On residential or commercial work, CIPP lining can restore a qualifying sewer from the inside instead of a full open cut-and-replace.",
  },
  {
    title: "Excavation & Deep Tunnel Work",
    href: "/residential-sewer-water",
    icon: HardHat,
    summary:
      "We handle deep sewer excavation, sewer line excavation, water pipe excavation, sand rock work, and deep tunnel utility projects.",
  },
  {
    title: "Repairs & Replacements",
    href: "/contact",
    icon: Wrench,
    summary:
      "We handle pipe repairs, pipe segment replacement, manholes, catch basins, storm sewers, water mains, and hydrant-related utility work.",
  },
  {
    title: "24/7 Emergency Service",
    href: "/contact",
    icon: Clock,
    summary:
      "If you have an active backup, leak, service interruption, or urgent sewer or water issue, call our emergency line.",
  },
];

export const homeFeatured = [
  {
    title: "Residential Sewer & Water",
    href: "/residential-sewer-water",
    summary:
      "Repair, replace, install, and evaluate sewer laterals, water lines, storm work, and related utilities at the property.",
    image: {
      src: "/images/home-work-residential-under.png",
      alt: "Residential sewer hole with a sheet-steel trench box set in with a pull-gap; white PVC in a sub-ditch under the box, not through the walls",
    },
    ctaLabel: "View Residential Services",
  },
  {
    title: "Commercial Sewer & Water",
    href: "/commercial-sewer-water",
    summary:
      "Sewer and water work for property owners, managers, developers, contractors, and facilities teams, planned around access and disruption.",
    image: {
      src: "/images/home-work-commercial-person-moved.png",
      alt: "Commercial parking-lot sewer pit with a sheet-steel trench box; worker standing on the asphalt at the rim; white PVC in dirt under the box beside an office building",
    },
    ctaLabel: "View Commercial Services",
  },
];

export const homeLining = {
  eyebrow: "When the pipe qualifies",
  title: "Line the pipe instead of replacing the entire line.",
  summary:
    "CIPP lining restores a qualifying sewer from the inside, without replacing the entire line. It is available for residential and commercial work, typically with less excavation than a standard cut-and-replace, and is often the more cost-effective option. We evaluate the pipe on site before recommending it.",
  href: "/sewer-pipe-lining",
  ctaLabel: "How Lining Works",
  image: {
    src: "/images/cipp-before-after.png",
    alt: "Before and after sewer pipe lining comparison",
  },
  caption: "Damaged pipe interior and a lined pipe interior.",
};

export const trustPoints = [
  "Family-owned and operated",
  "Perma-Liner Certification #701271",
  "State of Minnesota Licensed Pipe Layer #8308",
  "Over 20 years of sewer, water, and excavation experience",
];

export const serviceNeededOptions = [
  ["not-sure", "Unsure - Need Professional Evaluation"],
  ["sewer-line-repair", "Sewer Line Repair"],
  ["sewer-line-replacement", "Sewer Line Replacement"],
  ["water-line-repair", "Water Line Repair"],
  ["water-line-replacement", "Water Line Replacement"],
  ["sewer-pipe-lining-cipp", "Sewer Pipe Lining / CIPP"],
  ["excavation-deep-tunnel", "Excavation / Deep Tunnel Work"],
  ["manhole-catch-basin-storm-sewer", "Manhole / Catch Basin / Storm Sewer"],
  ["fire-hydrant-water-main", "Fire Hydrant / Water Main"],
  ["emergency-sewer-water", "Emergency Sewer / Water Issue"],
] as const;

export const defaultServiceNeeded = serviceNeededOptions[0][0];

export const propertyTypes = [
  ["residential", "Residential"],
  ["commercial", "Commercial"],
  ["builder-developer", "Builder / Developer"],
  ["property-manager", "Property Manager"],
  ["other", "Other"],
] as const;

export const urgencyOptions = [
  ["planning-quote-only", "Planning / Quote Only"],
  ["this-week", "This Week"],
  ["within-24-hours", "Within 24 Hours"],
  ["emergency-now", "Emergency Now"],
] as const;

export const referralOptions = [
  ["ad", "Ad"],
  ["word-of-mouth", "Word of Mouth"],
  ["social-media", "Social Media"],
  ["google-search", "Google Search"],
  ["return-customer", "Return Customer"],
  ["contractor-builder", "Contractor / Builder"],
  ["truck-yard-sign", "Truck / Yard Sign"],
  ["other", "Other"],
] as const;

export const noReferralSelected = "No referral selected";

export const ctaServices = [
  "Sewer line repair",
  "Water line replacement",
  "Sewer pipe lining",
  "Emergency sewer/water service",
];

export const DropletsIcon = Droplets;
