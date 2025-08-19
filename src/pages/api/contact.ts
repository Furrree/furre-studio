// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  console.log("🔍 Incoming form data:", { name, email, subject, message });
  console.log("🔍 ENV:", {
    HAS_API_KEY: !!process.env.RESEND_API_KEY,
    MAIL_TO: process.env.MAIL_TO,
  });

  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // free plan only allows this
      to: process.env.MAIL_TO!,
      subject: `${name}: ${subject || "No Subject"}`,
      text: `New message from ${name} (${email}):\n\n${message}`,
    });

    console.log("✅ Resend response:", response);

    res.status(200).json({ success: true, response });
  } catch (err: any) {
    console.error("❌ Send email error:", err);
    res.status(500).json({ error: "Failed to send email", details: err.message || err });
  }
}
