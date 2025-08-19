// pages/api/contact.cjs
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY || "");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await resend.emails.send({
      from: process.env.MAIL_FROM || "onboarding@resend.dev",
      to: process.env.MAIL_TO || "your@email.com",
      subject: `${name}: ${subject || "No Subject"}`,
      text: `New message from ${name} (${email}):\n\n${message}`,
    });

    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("Email send failed:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
};
