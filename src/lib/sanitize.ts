const UNSAFE_CONTROL =
  /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u202A-\u202E\u2066-\u2069]/g;

function stripTags(input: string) {
  let value = input.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ");
  value = value.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ");
  let previous = "";
  while (previous !== value) {
    previous = value;
    value = value.replace(/<[^>]*>/g, " ");
  }
  return value.replace(/[<>]/g, "");
}

export function sanitizePlainText(
  input: string,
  options?: { multiline?: boolean; max?: number },
) {
  let value = input.normalize("NFC");
  value = stripTags(value);
  value = value.replace(/javascript:/gi, "");
  value = value.replace(/vbscript:/gi, "");
  value = value.replace(/data:\s*text\/html/gi, "");
  value = value.replace(UNSAFE_CONTROL, "");

  if (options?.multiline) {
    value = value.replace(/\r\n?/g, "\n").replace(/\n{3,}/g, "\n\n");
  } else {
    value = value.replace(/[\n\r]+/g, " ").replace(/\s+/g, " ");
  }

  value = value.trim();
  if (options?.max != null && value.length > options.max) {
    value = value.slice(0, options.max).trim();
  }
  return value;
}

export function sanitizePhone(input: string) {
  return sanitizePlainText(input)
    .replace(/[^\d().\-\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function sanitizeZip(input: string) {
  const compact = sanitizePlainText(input).replace(/[^\d-]/g, "");
  const match = compact.match(/^(\d{5})-?(\d{4})?$/);
  if (!match) return compact;
  return match[2] ? `${match[1]}-${match[2]}` : match[1];
}

export function sanitizeRecord(data: Record<string, unknown>) {
  const next: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value !== "string") {
      next[key] = value;
      continue;
    }
    if (key === "phone") {
      next[key] = sanitizePhone(value);
      continue;
    }
    if (key === "zip") {
      next[key] = sanitizeZip(value);
      continue;
    }
    if (key === "email") {
      next[key] = sanitizePlainText(value).toLowerCase();
      continue;
    }
    next[key] = sanitizePlainText(value, {
      multiline: key === "message" || key === "additionalDetails" || key === "currentIssue",
    });
  }
  return next;
}

export function addressMatchKey(parts: {
  serviceAddress: string;
  city: string;
  state: string;
  zip: string;
}) {
  const street = sanitizePlainText(parts.serviceAddress).toLowerCase();
  const city = sanitizePlainText(parts.city).toLowerCase();
  const state = sanitizePlainText(parts.state).toUpperCase();
  const zip = sanitizeZip(parts.zip);
  if (!street || !city || !state || !zip) return "";
  return `${street}|${city}|${state}|${zip}`;
}
