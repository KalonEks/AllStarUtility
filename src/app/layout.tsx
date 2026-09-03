import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SiteBackdrop } from "@/components/site-backdrop";
import { TrackingEvents } from "@/components/tracking-events";
import { getSession } from "@/lib/security";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "All-Star Utilities | Twin Cities Sewer, Water, Excavation & Pipe Lining",
    template: "%s | All-Star Utilities",
  },
  description:
    "Family-owned Twin Cities sewer, water, excavation, and sewer pipe lining specialists offering free consultations and 24/7 emergency service.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "All-Star Utilities",
    description: "Twin Cities sewer, water, excavation, and pipe lining specialists.",
    url: siteUrl,
    siteName: "All-Star Utilities",
    images: ["/images/residential-utility-hero.png"],
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  const session = await getSession();

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        {process.env.NODE_ENV === "development" ? (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        ) : null}
      </head>
      <body className="flex min-h-full flex-col">
        {ga4Id ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}');`}
            </Script>
          </>
        ) : null}
        <SiteBackdrop />
        <Header isAuthenticated={Boolean(session)} />
        <main className="relative flex-1">{children}</main>
        <Footer />
        <TrackingEvents />
      </body>
    </html>
  );
}
