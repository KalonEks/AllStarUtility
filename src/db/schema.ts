import { boolean, integer, jsonb, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["OWNER", "ADMIN"]);
export const inquiryStatusEnum = pgEnum("inquiry_status", [
  "NEW",
  "CONTACTED",
  "SCHEDULED",
  "ESTIMATE_SENT",
  "WON",
  "LOST",
  "SPAM",
  "ARCHIVED",
]);

export const consultationSessionStatusEnum = pgEnum("consultation_session_status", ["active", "submitted", "abandoned"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: userRoleEnum("role").notNull().default("ADMIN"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
});

export const inquiries = pgTable("inquiries", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  preferredContactMethod: text("preferred_contact_method").notNull(),
  serviceAddress: text("service_address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: text("zip").notNull(),
  propertyType: text("property_type").notNull(),
  serviceNeeded: text("service_needed").array().notNull(),
  urgency: text("urgency").notNull(),
  message: text("message").notNull(),
  currentIssue: text("current_issue"),
  bestContactTime: text("best_contact_time"),
  howHeard: text("how_heard"),
  status: inquiryStatusEnum("status").notNull().default("NEW"),
  source: text("source"),
  landingPage: text("landing_page"),
  referrer: text("referrer"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  utmTerm: text("utm_term"),
  utmContent: text("utm_content"),
  gclid: text("gclid"),
  gbraid: text("gbraid"),
  wbraid: text("wbraid"),
  ipHash: text("ip_hash"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const inquiryNotes = pgTable("inquiry_notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  inquiryId: uuid("inquiry_id").references(() => inquiries.id).notNull(),
  authorUserId: uuid("author_user_id").references(() => users.id),
  note: text("note").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const inquiryEvents = pgTable("inquiry_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  inquiryId: uuid("inquiry_id").references(() => inquiries.id).notNull(),
  eventType: text("event_type").notNull(),
  oldValue: text("old_value"),
  newValue: text("new_value"),
  createdByUserId: uuid("created_by_user_id").references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const emailEvents = pgTable("email_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  inquiryId: uuid("inquiry_id").references(() => inquiries.id),
  provider: text("provider").notNull(),
  messageId: text("message_id"),
  toEmail: text("to_email").notNull(),
  fromEmail: text("from_email").notNull(),
  subject: text("subject").notNull(),
  status: text("status").notNull(),
  error: text("error"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const consultationSessions = pgTable("consultation_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  currentStep: integer("current_step").notNull().default(1),
  maxStepReached: integer("max_step_reached").notNull().default(1),
  status: consultationSessionStatusEnum("status").notNull().default("active"),
  payload: jsonb("payload").notNull().default({}),
  submittedInquiryId: uuid("submitted_inquiry_id").references(() => inquiries.id),
  landingPage: text("landing_page"),
  referrer: text("referrer"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  utmTerm: text("utm_term"),
  utmContent: text("utm_content"),
  gclid: text("gclid"),
  gbraid: text("gbraid"),
  wbraid: text("wbraid"),
  ipHash: text("ip_hash"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const consultationSessionEvents = pgTable("consultation_session_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id").references(() => consultationSessions.id).notNull(),
  eventType: text("event_type").notNull(),
  step: integer("step"),
  metadata: text("metadata"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
