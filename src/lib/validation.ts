import { z } from "zod";
import { propertyTypes, serviceNeededOptions, urgencyOptions } from "@/lib/content";
import { sanitizePhone, sanitizePlainText, sanitizeZip } from "@/lib/sanitize";

function optionValues<T extends readonly (readonly [string, string])[]>(options: T) {
  return options.map(([value]) => value) as [T[number][0], ...T[number][0][]];
}

export const propertyTypeValues = optionValues(propertyTypes);
export const serviceNeededValues = optionValues(serviceNeededOptions);
export const urgencyValues = optionValues(urgencyOptions);

function plainText(max: number, options?: { min?: number; message?: string; multiline?: boolean }) {
  return z
    .string()
    .transform((value) => sanitizePlainText(value, { max, multiline: options?.multiline }))
    .pipe(z.string().min(options?.min ?? 0, options?.message).max(max));
}

function optionalPlainText(max: number, options?: { multiline?: boolean }) {
  return z
    .string()
    .transform((value) => sanitizePlainText(value, { max, multiline: options?.multiline }))
    .pipe(z.string().max(max))
    .optional()
    .or(z.literal(""));
}

const trackingFields = {
  landingPage: optionalPlainText(600),
  referrer: optionalPlainText(600),
  utm_source: optionalPlainText(200),
  utm_medium: optionalPlainText(200),
  utm_campaign: optionalPlainText(200),
  utm_term: optionalPlainText(200),
  utm_content: optionalPlainText(200),
  gclid: optionalPlainText(300),
  gbraid: optionalPlainText(300),
  wbraid: optionalPlainText(300),
};

export const personalInfoStepSchema = z.object({
  firstName: plainText(80, { min: 1, message: "First name is required." }),
  lastName: plainText(80, { min: 1, message: "Last name is required." }),
  email: z
    .string()
    .transform((value) => sanitizePlainText(value, { max: 160 }).toLowerCase())
    .pipe(z.email("Enter a valid email address.").max(160)),
  phone: z
    .string()
    .transform((value) => sanitizePhone(value).slice(0, 30))
    .pipe(z.string().min(7, "Enter a valid phone number.").max(30)),
});

export const propertyDetailsStepSchema = z.object({
  propertyType: z.enum(propertyTypeValues, { message: "Select a property type." }),
  serviceAddress: plainText(180, { min: 3, message: "Service address is required." }),
  city: plainText(100, { min: 2, message: "City is required." }),
  state: plainText(40, { min: 2 }),
  zip: z
    .string()
    .transform((value) => sanitizeZip(value))
    .pipe(z.string().regex(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP code.")),
});

export const serviceDetailsStepSchema = z.object({
  serviceNeeded: z.enum(serviceNeededValues, { message: "Select a service." }),
  urgency: z.enum(urgencyValues, { message: "Select an urgency level." }),
  message: plainText(4000, { min: 5, message: "Describe the current issue.", multiline: true }),
});

export const submitStepSchema = z.object({
  additionalDetails: optionalPlainText(4000, { multiline: true }),
  consent: z.boolean().refine((value) => value, "Consent is required."),
  companyWebsite: z
    .string()
    .transform((value) => sanitizePlainText(value, { max: 200 }))
    .optional()
    .or(z.literal("")),
  turnstileToken: z.string().optional(),
});

export const consultationFormSchema = personalInfoStepSchema
  .merge(propertyDetailsStepSchema)
  .merge(serviceDetailsStepSchema)
  .merge(submitStepSchema);

export const createSessionSchema = z.object({
  step: z.literal(1),
  data: personalInfoStepSchema,
  ...trackingFields,
});

export const updateSessionSchema = z.object({
  step: z.number().int().min(1).max(4),
  data: z.record(z.string(), z.unknown()),
  eventType: z.enum(["step_completed", "step_back", "step_viewed"]).default("step_completed"),
});

export const submitSessionSchema = consultationFormSchema.merge(z.object(trackingFields));

export const inquirySchema = z.object({
  firstName: plainText(80, { min: 1 }),
  lastName: plainText(80, { min: 1 }),
  email: z
    .string()
    .transform((value) => sanitizePlainText(value, { max: 160 }).toLowerCase())
    .pipe(z.email().max(160)),
  phone: z
    .string()
    .transform((value) => sanitizePhone(value).slice(0, 30))
    .pipe(z.string().min(7).max(30)),
  serviceAddress: plainText(180, { min: 3 }),
  city: plainText(100, { min: 2 }),
  state: plainText(40, { min: 2 }),
  zip: z
    .string()
    .transform((value) => sanitizeZip(value))
    .pipe(z.string().regex(/^\d{5}(-\d{4})?$/)),
  propertyType: z.enum(propertyTypeValues),
  serviceNeeded: z.array(z.enum(serviceNeededValues)).min(1),
  urgency: z.enum(urgencyValues),
  message: plainText(4000, { min: 5, multiline: true }),
  currentIssue: optionalPlainText(500, { multiline: true }),
  bestContactTime: optionalPlainText(120),
  howHeard: optionalPlainText(120),
  consent: z.boolean().refine((value) => value, "Consent is required."),
  companyWebsite: z
    .string()
    .transform((value) => sanitizePlainText(value, { max: 200 }))
    .optional()
    .or(z.literal("")),
  landingPage: optionalPlainText(600),
  referrer: optionalPlainText(600),
  utm_source: optionalPlainText(200),
  utm_medium: optionalPlainText(200),
  utm_campaign: optionalPlainText(200),
  utm_term: optionalPlainText(200),
  utm_content: optionalPlainText(200),
  gclid: optionalPlainText(300),
  gbraid: optionalPlainText(300),
  wbraid: optionalPlainText(300),
  turnstileToken: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(200),
});

export type ConsultationFormData = z.infer<typeof consultationFormSchema>;
export type ConsultationFormState = Omit<ConsultationFormData, "serviceNeeded"> & {
  serviceNeeded: ConsultationFormData["serviceNeeded"] | "";
};
