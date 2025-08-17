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

const adminHtml = ({ name, email, subject, message }: any) => `
<div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:auto;border:1px solid #eee;border-radius:14px;overflow:hidden">
<div style="background:#0b0f19;padding:18px 20px;color:#fff;font-weight:700;font-size:18px">
📩 New Lead — ${BRAND.name}
</div>
<div style="padding:20px;background:#fafafa;color:#111;line-height:1.6">
<p><b>Name:</b> ${name}</p>
<p><b>Email:</b> ${email}</p>
<p><b>Subject:</b> ${subject || "No Subject"}</p>
<hr style="border:none;border-top:1px solid #e5e7eb;margin:18px 0"/>
<p><b>Message</b></p>
<blockquote style="margin:0;border-left:4px solid #7c3aed;padding-left:12px;color:#374151">
${String(message || "").replace(/\n/g, "<br/>")}
</blockquote>
<p style="font-size:12px;color:#6b7280;margin-top:18px">
Submitted: ${now()} • Source: <a href="${BRAND.site}">${BRAND.site}</a>
</p>
</div>
<div style="background:#0b0f19;color:#9ca3af;text-align:center;padding:10px;font-size:12px">
✨ ${BRAND.name}
</div>
</div>
`;

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

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

  // Send admin email
  try {
    await resend.emails.send({
      from: BRAND.from,
      to: BRAND.adminTo,
      subject: `📩 ${payload.name}: ${payload.subject || "No Subject"}`,
      text: `New Lead (${now()}):\nName: ${payload.name}\nEmail: ${payload.email}\nSubject: ${payload.subject}\n\nMessage:\n${payload.message}`,
      html: adminHtml(payload),
    });
  } catch (e) {
    console.error("Admin email failed:", e);
    return res.status(500).json({ success: false, error: "Failed to send admin email" });
  }

  res.json({ success: true, status: "sent" });
}
