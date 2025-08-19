import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
    });

    await transporter.sendMail({
      from: `"Furre Studio Website" <${process.env.EMAIL_USER}>`,
      to: "contact@furrealfread.com", // Your inbox
      subject: `📩 New Lead — ${subject}`,
      html: `
        <div style="max-width:600px;margin:auto;padding:20px;
          font-family:Arial,Helvetica,sans-serif;background:#f9fafb;
          border-radius:12px;border:1px solid #e5e7eb;">
          <h2 style="color:#111827;text-align:center;">📩 New Lead</h2>
          <p style="text-align:center;color:#6b7280;">
            You just received a new inquiry 🚀
          </p>
          <div style="background:white;padding:16px;border-radius:10px;
            margin-top:20px;border:1px solid #e5e7eb;">
            <p><strong>👤 Name:</strong> ${name}</p>
            <p><strong>📧 Email:</strong> ${email}</p>
            <p><strong>📝 Subject:</strong> ${subject}</p>
            <p><strong>💬 Message:</strong><br/>${message}</p>
          </div>
          <div style="margin-top:20px;font-size:14px;color:#6b7280;text-align:center;">
            <p>⏰ Submitted: ${new Date().toLocaleString()}</p>
            <p>🌐 Source: furrestudio.com</p>
          </div>
          <div style="margin-top:30px;text-align:center;">
            <p style="font-weight:bold;color:#7c3aed;font-size:16px;">✨ Furre Studio</p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({ message: "Failed to send email" });
  }
}
