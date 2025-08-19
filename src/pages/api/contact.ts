// pages/api/contact.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // Free plan only allows this
      to: process.env.MAIL_TO,
      subject: `${name}: ${subject || "No Subject"}`,
      text: `New message from ${name} (${email}): ${message}`,
    });

    res.status(200).json({ success: true, response });
  } catch (err) {
    console.error("Send email error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
}
