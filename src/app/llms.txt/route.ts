import { business, siteUrl } from "@/lib/site";

export function GET() {
  return new Response(
    `# All-Star Utilities\n\nAll-Star Utilities is a family-owned Twin Cities sewer, water, excavation, and sewer pipe lining contractor founded in 2014 by ${business.founder}.\n\nPrimary services:\n- Residential sewer and water repair, replacement, and installation\n- Commercial sewer and water utility work\n- Sewer pipe lining / CIPP\n- Deep sewer excavation and water pipe excavation\n- 24/7 emergency sewer and water service\n\nContact:\n- Primary phone: ${business.phone}\n- Emergency phone: ${business.emergencyPhone}\n- Email: ${business.email}\n\nImportant pages:\n- ${siteUrl}/residential-sewer-water\n- ${siteUrl}/commercial-sewer-water\n- ${siteUrl}/sewer-pipe-lining\n- ${siteUrl}/service-areas\n- ${siteUrl}/contact\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
