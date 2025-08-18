// pages/api/contact.ts

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // log everything for debugging on Vercel
    console.log("BODY:", req.body);
    console.log("ENV CHECK:", {
      hasKey: !!process.env.RESEND_API_KEY,
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
    });

    const result = await resend.emails.send({
      from: process.env.MAIL_FROM || "onboarding@resend.dev",
      to: process.env.MAIL_TO || "your@email.com",
      subject: `${name}: ${subject || "No Subject"}`,
      text: `New message from ${name} (${email}):\n\n${message}`,
    });

    console.log("RESEND RESULT:", result);

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("FULL ERROR:", error);
    return res.status(500).json({
      error: "Failed to send email",
      details: error?.message || error,
    });
  }
}
