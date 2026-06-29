export const siteUrl = process.env.APP_URL || "https://www.allstarutilities.com";

export const business = {
  name: "All-Star Utilities",
  tagline: "Twin Cities Utility Specialists",
  phone: "651-900-9704",
  phoneHref: "16519009704",
  emergencyPhone: "651-248-1697",
  emergencyPhoneHref: "16512481697",
  fax: "612-460-9370",
  email: "CONTACT_EMAIL_PLACEHOLDER",
  primaryAddress: "27498 Olinda Trail, Lindstrom, MN 55045",
  secondaryAddress: "2038 Ford Parkway Ste. 322, St. Paul, MN 55116",
  founded: "2014",
  founder: "Mike Boston",
  warranty: "10-year workmanship guarantee",
  credentials: [
    "Perma-Liner Certification #701271",
    "Confined Space Certification",
    "State of Minnesota Plumbing Bond #PB735090",
    "State of Minnesota Licensed Pipe Layer #8308",
    "St. Paul Right of Way License #20140000887",
    "BBB A+",
  ],
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/residential-sewer-water", label: "Residential" },
  { href: "/commercial-sewer-water", label: "Commercial" },
  { href: "/service-areas", label: "Service Areas" },
];

export const serviceAreas = {
  minneapolis: [
    "Calhoun Isles",
    "Camden",
    "Central",
    "Uptown",
    "Southwest",
    "University",
    "Nokomis",
    "Longfellow",
    "Near North",
    "Powderhorn",
  ],
  stPaul: [
    "Highwood Hills",
    "Greater East Side",
    "West Side",
    "Dayton's Bluff",
    "Payne-Phalen",
    "North End",
    "Frogtown",
    "Summit-University",
    "West 7th/Fort Road",
    "Como Park",
    "Hamline Midway",
    "Saint Anthony Park",
    "Union Park",
    "Macalester-Groveland",
    "Highland Park",
    "Summit Hill",
    "Downtown",
  ],
};
