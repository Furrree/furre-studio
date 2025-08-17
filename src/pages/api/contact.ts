import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, subject, message } = body;

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
  }

  try {
    await resend.emails.send({
      from: process.env.MAIL_FROM!,
      to: process.env.MAIL_TO!,
      subject: `${name}: ${subject || "No Subject"}`,
      text: `New message from ${name} (${email}): ${message}`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Send email error:", err);
    return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
  }
}
