import { business, siteUrl } from "@/lib/site";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    url: siteUrl,
    telephone: business.phone,
    email: business.email,
    slogan: business.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: "27498 Olinda Trail",
      addressLocality: "Lindstrom",
      addressRegion: "MN",
      postalCode: "55045",
      addressCountry: "US",
    },
    areaServed: ["Twin Cities metro area", "Minneapolis", "St. Paul"],
    foundingDate: "2014",
    founder: business.founder,
    makesOffer: ["Sewer line repair", "Water line replacement", "Sewer pipe lining", "Excavation"],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
