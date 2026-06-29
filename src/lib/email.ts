import { Resend } from "resend";
import { emailEvents, inquiries } from "@/db/schema";
import { getDb } from "@/lib/db";

type InquiryRow = typeof inquiries.$inferSelect;

export async function sendInquiryEmail(inquiry: InquiryRow) {
  const db = getDb();
  const provider = process.env.EMAIL_PROVIDER || "resend";
  const apiKey = process.env.EMAIL_API_KEY;
  const from = process.env.EMAIL_FROM || "All-Star Utilities <no-reply@allstarutilities.com>";
  const to = process.env.INQUIRY_TO_EMAIL || "CONTACT_EMAIL_PLACEHOLDER";
  const subject = `New All-Star Utilities consultation inquiry - ${inquiry.urgency} - ${inquiry.city}`;

  if (!apiKey || provider !== "resend") {
    await db.insert(emailEvents).values({
      inquiryId: inquiry.id,
      provider,
      toEmail: to,
      fromEmail: from,
      subject,
      status: "skipped",
      error: "EMAIL_API_KEY missing or EMAIL_PROVIDER is not resend.",
    });
    return;
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to,
      subject,
      text: [
        `Name: ${inquiry.firstName} ${inquiry.lastName}`,
        `Phone: ${inquiry.phone}`,
        `Email: ${inquiry.email}`,
        `Address: ${inquiry.serviceAddress}, ${inquiry.city}, ${inquiry.state} ${inquiry.zip}`,
        `Property type: ${inquiry.propertyType}`,
        `Service needed: ${inquiry.serviceNeeded.join(", ")}`,
        `Urgency: ${inquiry.urgency}`,
        `Message: ${inquiry.message}`,
        `Source: ${inquiry.utmSource || inquiry.source || "direct/unknown"}`,
        `Dashboard: ${(process.env.APP_URL || "http://localhost:3000")}/owner/inquiries/${inquiry.id}`,
      ].join("\n"),
    });
    await db.insert(emailEvents).values({
      inquiryId: inquiry.id,
      provider,
      messageId: result.data?.id,
      toEmail: to,
      fromEmail: from,
      subject,
      status: "sent",
    });
  } catch (error) {
    await db.insert(emailEvents).values({
      inquiryId: inquiry.id,
      provider,
      toEmail: to,
      fromEmail: from,
      subject,
      status: "failed",
      error: error instanceof Error ? error.message : "Unknown email error",
    });
  }
}
