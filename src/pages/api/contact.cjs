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
    console.log("DEBUG: Sending email with", {
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      apiKey: !!process.env.RESEND_API_KEY,
    });

    const result = await resend.emails.send({
      from: "onboarding@resend.dev", // free plan only works with this
      to: process.env.MAIL_TO || "your@email.com",
      subject: `${name}: ${subject || "No Subject"}`,
      text: `New message from ${name} (${email}):\n\n${message}`,
    });

    console.log("DEBUG: Resend API response", result);

    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("EMAIL ERROR >>>", err);
    return res.status(500).json({ error: "Failed to send email", details: err.message });
  }
};
