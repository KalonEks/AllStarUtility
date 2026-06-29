import type { ConsultationFormData } from "@/lib/validation";

export type SessionPayload = Partial<ConsultationFormData>;

export function mergeSessionPayload(existing: SessionPayload, incoming: SessionPayload): SessionPayload {
  return { ...existing, ...incoming };
}

export function buildInquiryMessage(data: ConsultationFormData) {
  const additional = data.additionalDetails?.trim();
  if (!additional) return data.message;
  return `${data.message}\n\nAdditional details: ${additional}`;
}

export function trackingFromBody(body: Record<string, unknown>) {
  return {
    landingPage: String(body.landingPage || "") || null,
    referrer: String(body.referrer || "") || null,
    utmSource: String(body.utm_source || "") || null,
    utmMedium: String(body.utm_medium || "") || null,
    utmCampaign: String(body.utm_campaign || "") || null,
    utmTerm: String(body.utm_term || "") || null,
    utmContent: String(body.utm_content || "") || null,
    gclid: String(body.gclid || "") || null,
    gbraid: String(body.gbraid || "") || null,
    wbraid: String(body.wbraid || "") || null,
  };
}
