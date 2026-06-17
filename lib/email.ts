import "server-only";
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const FROM = process.env.EMAIL_FROM ?? "USA2BIH <onboarding@resend.dev>";
const TO = process.env.EMAIL_TO ?? "info@usa2bih.com";

const resend = apiKey ? new Resend(apiKey) : null;

type SendArgs = { to?: string; subject: string; html: string; replyTo?: string };

/** Sends an email via Resend; no-ops with a warning when no API key is set. */
async function send({ to = TO, subject, html, replyTo }: SendArgs) {
  if (!resend) {
    console.warn(`[email] RESEND_API_KEY not set — skipped: "${subject}"`);
    return;
  }
  await resend.emails.send({ from: FROM, to, subject, html, replyTo });
}

const wrap = (title: string, rows: [string, string][], body?: string) => `
  <div style="font-family:system-ui,sans-serif;background:#06080c;color:#e8eef7;padding:24px;border-radius:12px">
    <h2 style="margin:0 0 16px;color:#5cb6ff">${title}</h2>
    ${body ? `<p style="color:#c9d3e0">${body}</p>` : ""}
    <table style="width:100%;border-collapse:collapse;margin-top:12px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 8px;color:#8a94a6;width:130px">${k}</td><td style="padding:6px 8px">${v}</td></tr>`,
        )
        .join("")}
    </table>
  </div>`;

export async function sendInquiryEmail(inquiry: {
  name: string;
  email: string;
  phone: string | null;
  message: string;
  vehicle?: { make: string; model: string; year: number; slug: string } | null;
}) {
  const vehicleLine = inquiry.vehicle
    ? `${inquiry.vehicle.year} ${inquiry.vehicle.make} ${inquiry.vehicle.model}`
    : "General inquiry";
  await send({
    subject: `New inquiry: ${vehicleLine}`,
    replyTo: inquiry.email,
    html: wrap(
      "New vehicle inquiry",
      [
        ["Vehicle", vehicleLine],
        ["Name", inquiry.name],
        ["Email", inquiry.email],
        ["Phone", inquiry.phone ?? "—"],
        ["Message", inquiry.message],
      ],
    ),
  });
}

export async function sendContactEmail(msg: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  await send({
    subject: `Contact form: ${msg.subject}`,
    replyTo: msg.email,
    html: wrap("New contact message", [
      ["Name", msg.name],
      ["Email", msg.email],
      ["Subject", msg.subject],
      ["Message", msg.message],
    ]),
  });
}
