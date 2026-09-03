import { minnesota } from "@/lib/site";

function digitsOnly(input: string) {
  return input.replace(/\D/g, "");
}

export function includesPhoneCountryCode(input: string) {
  const trimmed = input.trim();
  if (trimmed.includes("+") || /^00/.test(trimmed)) return true;
  const digits = digitsOnly(trimmed);
  return digits.length > 10 || (digits.length === 11 && digits.startsWith("1"));
}

export function isUsNationalPhone(input: string) {
  if (includesPhoneCountryCode(input)) return false;
  return /^[2-9]\d{2}[2-9]\d{6}$/.test(digitsOnly(input));
}

export function formatUsNationalPhone(input: string) {
  const digits = digitsOnly(input);
  if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(digits)) return input;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function constrainPhoneInput(input: string) {
  const next = input.replace(/[^\d().\-\s]/g, "");
  const digits = digitsOnly(next);
  if (digits.length <= 11) return next;
  let kept = 0;
  let out = "";
  for (const char of next) {
    if (/\d/.test(char)) {
      if (kept >= 11) continue;
      kept += 1;
    }
    out += char;
  }
  return out;
}

export function isMinnesotaZip(input: string) {
  const digits = digitsOnly(input);
  if (digits.length !== 5 && digits.length !== 9) return false;
  const zip5 = Number(digits.slice(0, 5));
  return zip5 >= minnesota.zipMin && zip5 <= minnesota.zipMax;
}

export function isMinnesotaState(input: string) {
  const value = input.trim().toUpperCase();
  return value === minnesota.abbreviation || value === "MINNESOTA";
}

export function constrainZipInput(input: string) {
  return input.replace(/[^\d-]/g, "").slice(0, 10);
}
