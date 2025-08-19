// server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

// ——— Setup ———
const app = express();
const PORT = process.env.PORT || 5000;

const BRAND = {
  from: process.env.MAIL_FROM || "Furre Studio <noreply@furrestudio.com>",
  adminTo: process.env.MAIL_TO || "furrealfread@gmail.com",
  site: process.env.SITE_URL || "https://furrestudio.com",
  name: "Furre Studio",
};

// Transport (works with Gmail, SMTP, etc.)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ——— Middleware ———
app.use(cors({ origin: true }));
app.use(helmet());
app.use(bodyParser.json({ limit: "1mb" }));

// Rate limiter
app.use(
  "/api/contact",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, error: "Too many requests 🚦" },
  })
);

// ——— Helpers ———
const now = () => new Date().toISOString();
const strip = (v) => String(v ?? "").trim();
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");

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
app.post("/api/contact", async (req, res) => {
  const raw = req.body || {};
  const payload = {
    name: strip(raw.name),
    email: strip(raw.email),
    subject: strip(raw.subject),
    message: strip(raw.message),
    honeypot: strip(raw.honeypot),
  };

  if (payload.honeypot) return res.json({ success: true });

  if (!payload.name || !isEmail(payload.email) || !payload.message) {
    return res.status(400).json({ success: false, error: "Invalid form data" });
  }

  try {
    // Admin email
    await transporter.sendMail({
      from: BRAND.from,
      to: BRAND.adminTo,
      subject: `📩 ${payload.name}: ${payload.subject || "No Subject"}`,
      html: adminHtml(payload),
    });

    // Client auto-reply
    await transporter.sendMail({
      from: BRAND.from,
      to: payload.email,
      subject: `✅ Thanks for reaching out, ${payload.name}!`,
      html: clientHtml(payload),
    });

    res.json({ success: true, status: "sent" });
  } catch (err) {
    console.error("❌ Mail send error:", err);
    res.status(500).json({ success: false, error: "Mail send failed" });
  }
});

// Health check
app.get("/api/health", (_req, res) =>
  res.json({ ok: true, uptime: process.uptime(), time: now() })
);

// ——— Start server ———
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
