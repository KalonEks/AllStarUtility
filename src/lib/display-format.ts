import { propertyTypes, referralOptions, serviceNeededOptions, urgencyOptions } from "@/lib/content";

function titleCaseSegment(value: string) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : "";
}

export function toTitleCase(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .map((word) =>
      word
        .split("-")
        .map((segment) =>
          segment
            .split("'")
            .map((part) => titleCaseSegment(part))
            .join("'"),
        )
        .join("-"),
    )
    .join(" ");
}

function optionLabel(options: ReadonlyArray<readonly [string, string]>, value: string) {
  return options.find(([optionValue]) => optionValue === value)?.[1];
}

export function formatServiceNeeded(value: string) {
  return optionLabel(serviceNeededOptions, value) ?? toTitleCase(value.replace(/-/g, " "));
}

export function formatUrgency(value: string) {
  return optionLabel(urgencyOptions, value) ?? toTitleCase(value.replace(/-/g, " "));
}

export function formatPropertyType(value: string) {
  return optionLabel(propertyTypes, value) ?? toTitleCase(value.replace(/-/g, " "));
}

export function formatHowHeard(value: string) {
  return optionLabel(referralOptions, value) ?? toTitleCase(value.replace(/-/g, " "));
}

export function formatInquiryStatus(value: string) {
  return toTitleCase(value.replace(/_/g, " "));
}

export function formatInquiryMessage(message: string, additionalDetails?: string | null) {
  const additional = additionalDetails?.trim();
  if (!additional) return message;
  const duplicateSuffix = `\n\nAdditional details: ${additional}`;
  return message.endsWith(duplicateSuffix) ? message.slice(0, -duplicateSuffix.length) : message;
}
