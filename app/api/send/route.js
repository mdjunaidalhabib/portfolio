// app/api/send/route.js
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, subject, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 1️⃣ Admin receives the message
    const adminMailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New message: ${subject}`,
      text: `You received a new message from ${email}:\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h2>📩 New Contact Message</h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    };

    // 2️⃣ User gets a confirmation email
    const userConfirmationOptions = {
      from: `"Junaid's Portfolio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✅ Your message was received!",
      text: `Hi there,\n\nThanks for reaching out! I’ve received your message regarding "${subject}". I'll get back to you as soon as possible.\n\nHave a great day!\n\n— Shahin`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>✅ Thanks for your message!</h2>
          <p>Hi there,</p>
          <p>Thanks for reaching out! I’ve received your message regarding <strong>${subject}</strong>.</p>
          <p>I’ll get back to you as soon as possible.</p>
          <br/>
          <p>Best regards,<br/>— Junaid</p>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userConfirmationOptions);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Email send error:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
