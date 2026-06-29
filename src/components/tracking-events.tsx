"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function TrackingEvents() {
  useEffect(() => {
    function onSubmitted() {
      const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
      const label = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
      if (!window.gtag || !adsId || !label) return;
      window.gtag("event", "conversion", { send_to: `${adsId}/${label}` });
    }

    window.addEventListener("asu:consultation-submitted", onSubmitted);
    return () => window.removeEventListener("asu:consultation-submitted", onSubmitted);
  }, []);

  return null;
}
