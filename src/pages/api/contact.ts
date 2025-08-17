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

export const config = {
  runtime: "edge", // Optional: makes it run as Edge function on Vercel
};

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json" } }
    );
  }

  let raw: any = {};
  try {
    raw = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid JSON" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const payload = {
    name: strip(raw.name),
    email: strip(raw.email),
    subject: strip(raw.subject),
    message: strip(raw.message),
    honeypot: strip(raw.honeypot),
  };

  if (payload.honeypot) {
    return new Response(
      JSON.stringify({ success: true, status: "ok" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  const errors: string[] = [];
  if (!payload.name) errors.push("name");
  if (!isEmail(payload.email)) errors.push("email");
  if (!payload.message) errors.push("message");
  if (errors.length) {
    return new Response(
      JSON.stringify({ success: false, error: `Missing/invalid: ${errors.join(", ")}` }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!resendApiKey) {
    return new Response(
      JSON.stringify({ success: true, message: "Simulated send (no API key)" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
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

    return new Response(
      JSON.stringify({ success: true, status: "sent", clientAutoReply }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error sending email:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to send message" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
