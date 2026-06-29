CREATE TYPE "public"."consultation_session_status" AS ENUM('active', 'submitted', 'abandoned');--> statement-breakpoint
CREATE TABLE "consultation_session_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"event_type" text NOT NULL,
	"step" integer,
	"metadata" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "consultation_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"current_step" integer DEFAULT 1 NOT NULL,
	"max_step_reached" integer DEFAULT 1 NOT NULL,
	"status" "consultation_session_status" DEFAULT 'active' NOT NULL,
	"payload" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"submitted_inquiry_id" uuid,
	"landing_page" text,
	"referrer" text,
	"utm_source" text,
	"utm_medium" text,
	"utm_campaign" text,
	"utm_term" text,
	"utm_content" text,
	"gclid" text,
	"gbraid" text,
	"wbraid" text,
	"ip_hash" text,
	"user_agent" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "consultation_session_events" ADD CONSTRAINT "consultation_session_events_session_id_consultation_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."consultation_sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consultation_sessions" ADD CONSTRAINT "consultation_sessions_submitted_inquiry_id_inquiries_id_fk" FOREIGN KEY ("submitted_inquiry_id") REFERENCES "public"."inquiries"("id") ON DELETE no action ON UPDATE no action;