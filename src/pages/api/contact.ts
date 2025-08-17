// server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";
import { Resend } from "resend";

// ——— Setup ———
const app = express();
const PORT = process.env.PORT || 5000;
const resendApiKey = process.env.RESEND_API_KEY || "";
const resend = new Resend(resendApiKey);

const BRAND = {
  from: process.env.MAIL_FROM || "Furre Studio <onboarding@resend.dev>",
  adminTo: process.env.MAIL_TO || "furrealfread@gmail.com",
  site: process.env.SITE_URL || "https://furrestudio.com",
  name: "Furre Studio",
};

// ——— Middleware ———
app.use(cors({ origin: true }));
app.use(helmet());
app.use(bodyParser.json({ limit: "1mb" }));

// Rate limiter (100 req per 15 min per IP on contact route)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, error: "Too many requests, slow down 🚦" },
});
app.use("/api/contact", limiter);

// ——— Helpers ———
const now = () => new Date().toISOString();
const strip = (v) => String(v ?? "").trim();
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const log = (...args) => console.log(`[${now()}]`, ...args);

const adminHtml = ({ name, email, subject, message }) => `
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

const clientHtml = ({ name, message }) => `
  <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:auto;border:1px solid #eee;border-radius:14px;overflow:hidden">
    <div style="background:#0b0f19;padding:18px 20px;color:#fff;font-weight:700;font-size:18px">
      ✅ Thanks for reaching out, ${strip(name) || "there"}!
    </div>
    <div style="padding:20px;background:#fafafa;color:#111;line-height:1.6">
      <p>We’ve received your message and will get back to you within <b>24 hours</b>.</p>
      <p><b>Your message:</b></p>
      <blockquote style="margin:0;border-left:4px solid #22c55e;padding-left:12px;color:#374151">
        ${String(message || "").replace(/\n/g, "<br/>")}
      </blockquote>
      <p style="margin-top:16px">Meanwhile, check out our work: <a href="${BRAND.site}">${BRAND.site}</a></p>
    </div>
    <div style="background:#0b0f19;color:#9ca3af;text-align:center;padding:10px;font-size:12px">
      🚀 ${BRAND.name} — Clean, Pro Websites for Creators & Brands
    </div>
  </div>
`;

// ——— Routes ———
app.post(
  "/api/contact",
  asyncHandler(async (req, res) => {
    const raw = req.body || {};
    const payload = {
      name: strip(raw.name),
      email: strip(raw.email),
      subject: strip(raw.subject),
      message: strip(raw.message),
      honeypot: strip(raw.honeypot),
    };

    if (payload.honeypot) {
      log("🤖 Bot trapped via honeypot");
      return res.json({ success: true, status: "ok" });
    }

    // Validation
    const errors = [];
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
      log("⚠️ Missing RESEND_API_KEY, skipping send.");
      return res.json({ success: true, message: "Simulated send (no API key)" });
    }

    // Send to admin
    await resend.emails.send({
      from: BRAND.from,
      to: BRAND.adminTo,
      subject: `📩 ${payload.name}: ${payload.subject || "No Subject"}`,
      text: `New Lead (${now()}):\nName: ${payload.name}\nEmail: ${payload.email}\nSubject: ${payload.subject}\n\nMessage:\n${payload.message}`,
      html: adminHtml(payload),
    });

    // Auto-reply (non-blocking)
    let clientAutoReply = false;
    try {
      await resend.emails.send({
        from: BRAND.from,
        to: payload.email,
        subject: `✅ Thanks for reaching out, ${payload.name}!`,
        text:
          `Hi ${payload.name},\n\n` +
          `Thanks for contacting ${BRAND.name}! We’ve received your message:\n\n${payload.message}\n\n—\nWe’ll reply within 24 hours.\n${BRAND.site}`,
        html: clientHtml(payload),
      });
      clientAutoReply = true;
    } catch (e) {
      log("⚠️ Auto-reply failed:", e?.message || e);
    }

    res.json({ success: true, status: "sent", clientAutoReply });
  })
);

// Health check
app.get("/api/health", (_req, res) =>
  res.json({ ok: true, uptime: process.uptime(), time: now() })
);

// Global error handler
app.use((err, _req, res, _next) => {
  console.error("❌ Uncaught error:", err);
  res.status(500).json({ success: false, error: "Server error" });
});

// ——— Start server ———
const server = app.listen(PORT, () =>
  log(`✅ Server running at http://localhost:${PORT}`)
);

// Graceful shutdown
process.on("SIGTERM", () => {
  log("🛑 SIGTERM received, shutting down");
  server.close(() => process.exit(0));
});
process.on("SIGINT", () => {
  log("🛑 SIGINT received, shutting down");
  server.close(() => process.exit(0));
});
