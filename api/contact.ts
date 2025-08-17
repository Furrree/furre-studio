// api/contact.ts
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY || "";
const resend = new Resend(resendApiKey);

const BRAND = {
  from: process.env.MAIL_FROM || "Furre Studio <onboarding@resend.dev>",
  adminTo: process.env.MAIL_TO || "furrealfread@gmail.com",
  site: process.env.SITE_URL || "https://furrestudio.com",
  name: "Furre Studio",
};

const now = () => new Date().toISOString();
const strip = (v: any) => String(v ?? "").trim();
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ success: false, error: "Method Not Allowed" });

  const raw = req.body || {};
  const payload = {
    name: strip(raw.name),
    email: strip(raw.email),
    subject: strip(raw.subject),
    message: strip(raw.message),
    honeypot: strip(raw.honeypot),
  };

  if (payload.honeypot) return res.json({ success: true });

  const errors = [];
  if (!payload.name) errors.push("name");
  if (!isEmail(payload.email)) errors.push("email");
  if (!payload.message) errors.push("message");
  if (errors.length) return res.status(400).json({ success: false, error: `Missing/invalid: ${errors.join(", ")}` });

  if (!resendApiKey) return res.json({ success: true, message: "Simulated send (no API key)" });

  try {
    await resend.emails.send({
      from: BRAND.from,
      to: BRAND.adminTo,
      subject: `📩 ${payload.name}: ${payload.subject || "No Subject"}`,
      text: `New Lead (${now()}):\nName: ${payload.name}\nEmail: ${payload.email}\nSubject: ${payload.subject}\n\nMessage:\n${payload.message}`,
    });
  } catch (e) {
    console.error("Admin email failed:", e);
    return res.status(500).json({ success: false, error: "Failed to send admin email" });
  }

  res.json({ success: true, status: "sent" });
}
