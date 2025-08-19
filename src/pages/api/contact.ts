import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev", // free plan only works with this
      to: process.env.MAIL_TO,
      subject: `${name}: ${subject || "No Subject"}`,
      text: `New message from ${name} (${email}):\n\n${message}`,
    });

    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("🔥 Email send failed:", err);
    res.status(500).json({ error: "Failed to send email", details: err.message });
  }
}
