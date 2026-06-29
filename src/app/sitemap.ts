import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const routes = [
  "",
  "/about",
  "/residential-sewer-water",
  "/commercial-sewer-water",
  "/sewer-pipe-lining",
  "/service-areas",
  "/contact",
  "/faq",
  "/privacy-policy",
  "/terms-of-use",
  "/disclaimer",
  "/lp/sewer-line-repair",
  "/lp/water-line-replacement",
  "/lp/sewer-pipe-lining",
  "/lp/emergency-sewer-water",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith("/lp") ? "monthly" : "weekly",
    priority: route === "" ? 1 : route.startsWith("/lp") ? 0.8 : 0.7,
  }));
}
