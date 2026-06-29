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
      "We help property owners, managers, developers, contractors, and facilities teams keep sewer and water projects moving with less disruption.",
  },
  {
    title: "Sewer Pipe Lining / CIPP",
    href: "/sewer-pipe-lining",
    icon: ShieldCheck,
    summary:
      "For the right pipe, CIPP lining can restore the line from the inside and reduce the need for open excavation.",
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
      "We take care of pipe repairs, pipe segment replacement, manholes, catch basins, storm sewers, water mains, and hydrant-related utility work.",
  },
  {
    title: "24/7 Emergency Service",
    href: "/contact",
    icon: Clock,
    summary:
      "If you have an active backup, leak, service interruption, or urgent sewer or water issue, call our emergency line.",
  },
];

export const trustPoints = [
  "Family-owned and operated",
  "Perma-Liner Certification #701271",
  "State of Minnesota Licensed Pipe Layer #8308",
  "Over 20 years of sewer, water, and excavation experience",
];

export const serviceNeededOptions = [
  ["sewer-line-repair", "Sewer Line Repair"],
  ["sewer-line-replacement", "Sewer Line Replacement"],
  ["water-line-repair", "Water Line Repair"],
  ["water-line-replacement", "Water Line Replacement"],
  ["sewer-pipe-lining-cipp", "Sewer Pipe Lining / CIPP"],
  ["excavation-deep-tunnel", "Excavation / Deep Tunnel Work"],
  ["manhole-catch-basin-storm-sewer", "Manhole / Catch Basin / Storm Sewer"],
  ["fire-hydrant-water-main", "Fire Hydrant / Water Main"],
  ["emergency-sewer-water", "Emergency Sewer / Water Issue"],
  ["not-sure", "Unsure - Need Professional Evaluation"],
] as const;

export const ctaServices = [
  "Sewer line repair",
  "Water line replacement",
  "Sewer pipe lining",
  "Emergency sewer/water service",
];

export const DropletsIcon = Droplets;
