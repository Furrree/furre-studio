import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY || "";
const resend = new Resend(resendApiKey);

const BRAND = {
  from: process.env.MAIL_FROM || "Furre Studio <onboarding@resend.dev>",
  adminTo: process.env.MAIL_TO || "furrealfread@gmail.com",
  site: process.env.SITE_URL || "https://furrestudio.com",
  name: "Furre Studio",
};

const strip = (v: any) => String(v ?? "").trim();
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const raw = req.body || {};
  const payload = {
    name: strip(raw.name),
    email: strip(raw.email),
    subject: strip(raw.subject),
    message: strip(raw.message),
    honeypot: strip(raw.honeypot),
  };

  if (payload.honeypot) {
    return res.status(200).json({ success: true, status: "ok" });
  }

  const errors: string[] = [];
  if (!payload.name) errors.push("name");
  if (!isEmail(payload.email)) errors.push("email");
  if (!payload.message) errors.push("message");
  if (errors.length) {
    return res.status(400).json({
      success: false,
      error: `Missing/invalid: ${errors.join(", ")}`,
    });
  }

  if (!resendApiKey) {
    return res.status(200).json({ success: true, message: "Simulated send (no API key)" });
  }

  try {
    // Send to admin
    await resend.emails.send({
      from: BRAND.from,
      to: BRAND.adminTo,
      subject: `📩 ${payload.name}: ${payload.subject || "No Subject"}`,
      text: `New Lead:\nName: ${payload.name}\nEmail: ${payload.email}\nSubject: ${payload.subject}\n\nMessage:\n${payload.message}`,
      html: `<p>Name: ${payload.name}</p><p>Email: ${payload.email}</p><p>Subject: ${payload.subject}</p><p>Message: ${payload.message}</p>`,
    });

    // Auto-reply (non-blocking)
    let clientAutoReply = false;
    try {
      await resend.emails.send({
        from: BRAND.from,
        to: payload.email,
        subject: `✅ Thanks for reaching out, ${payload.name}!`,
        text: `Hi ${payload.name},\n\nThanks for contacting ${BRAND.name}! We received your message:\n\n${payload.message}\n\n—\nWe’ll reply within 24 hours.\n${BRAND.site}`,
        html: `<p>Hi ${payload.name},</p><p>We received your message:</p><p>${payload.message}</p>`,
      });
      clientAutoReply = true;
    } catch (e) {
      console.warn("Auto-reply failed:", e);
    }

    return res.status(200).json({ success: true, status: "sent", clientAutoReply });
  } catch (err) {
    console.error("Error sending email:", err);
    return res.status(500).json({ success: false, error: "Failed to send message" });
  }
}
