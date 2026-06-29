import { z } from "zod";

const trackingFields = {
  landingPage: z.string().max(600).optional().or(z.literal("")),
  referrer: z.string().max(600).optional().or(z.literal("")),
  utm_source: z.string().max(200).optional().or(z.literal("")),
  utm_medium: z.string().max(200).optional().or(z.literal("")),
  utm_campaign: z.string().max(200).optional().or(z.literal("")),
  utm_term: z.string().max(200).optional().or(z.literal("")),
  utm_content: z.string().max(200).optional().or(z.literal("")),
  gclid: z.string().max(300).optional().or(z.literal("")),
  gbraid: z.string().max(300).optional().or(z.literal("")),
  wbraid: z.string().max(300).optional().or(z.literal("")),
};

export const personalInfoStepSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required.").max(80),
  lastName: z.string().trim().min(1, "Last name is required.").max(80),
  email: z.email("Enter a valid email address.").max(160),
  phone: z.string().trim().min(7, "Enter a valid phone number.").max(30),
});

export const propertyDetailsStepSchema = z.object({
  propertyType: z.string().trim().min(2).max(80),
  serviceAddress: z.string().trim().min(3, "Service address is required.").max(180),
  city: z.string().trim().min(2, "City is required.").max(100),
  state: z.string().trim().min(2).max(40),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP code."),
});

export const serviceDetailsStepSchema = z.object({
  serviceNeeded: z.string().trim().min(1, "Select a service."),
  urgency: z.string().trim().min(2, "Select an urgency level.").max(80),
  message: z.string().trim().min(5, "Describe the current issue.").max(4000),
});

export const submitStepSchema = z.object({
  additionalDetails: z.string().trim().max(4000).optional().or(z.literal("")),
  consent: z.boolean().refine((value) => value, "Consent is required."),
  companyWebsite: z.string().max(0).optional().or(z.literal("")),
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
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.email().max(160),
  phone: z.string().trim().min(7).max(30),
  serviceAddress: z.string().trim().min(3).max(180),
  city: z.string().trim().min(2).max(100),
  state: z.string().trim().min(2).max(40),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/),
  propertyType: z.string().trim().min(2).max(80),
  serviceNeeded: z.array(z.string().min(1)).min(1),
  urgency: z.string().trim().min(2).max(80),
  message: z.string().trim().min(5).max(4000),
  currentIssue: z.string().trim().max(500).optional().or(z.literal("")),
  bestContactTime: z.string().trim().max(120).optional().or(z.literal("")),
  howHeard: z.string().trim().max(120).optional().or(z.literal("")),
  consent: z.boolean().refine((value) => value, "Consent is required."),
  companyWebsite: z.string().max(0).optional().or(z.literal("")),
  landingPage: z.string().max(600).optional().or(z.literal("")),
  referrer: z.string().max(600).optional().or(z.literal("")),
  utm_source: z.string().max(200).optional().or(z.literal("")),
  utm_medium: z.string().max(200).optional().or(z.literal("")),
  utm_campaign: z.string().max(200).optional().or(z.literal("")),
  utm_term: z.string().max(200).optional().or(z.literal("")),
  utm_content: z.string().max(200).optional().or(z.literal("")),
  gclid: z.string().max(300).optional().or(z.literal("")),
  gbraid: z.string().max(300).optional().or(z.literal("")),
  wbraid: z.string().max(300).optional().or(z.literal("")),
  turnstileToken: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(200),
});

export type ConsultationFormData = z.infer<typeof consultationFormSchema>;
