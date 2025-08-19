import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  console.log("📩 Incoming request:", req.method, req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    console.error("❌ Missing fields:", { name, email, message });
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    console.log("🚀 Sending email via Resend...");
    const data = await resend.emails.send({
      from: "onboarding@resend.dev", // MUST be this on free plan
      to: process.env.MAIL_TO,
      subject: `${name}: ${subject || "No Subject"}`,
      text: `New message from ${name} (${email}):\n\n${message}`,
    });

    console.log("✅ Resend response:", data);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("🔥 Send email error:", err);
    res.status(500).json({ error: "Failed to send email", details: err.message });
  }
}
