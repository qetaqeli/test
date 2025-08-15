import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send confirmation email to the client
    await transporter.sendMail({
      from: `"Atomic Funding" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thanks for contacting Atomic Funding!",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for contacting Atomic Funding!</p>
        <p>We received your message:</p>
        <blockquote style="margin: 1em 0; padding: 1em; background: #f9f9f9; border-left: 4px solid #00d084;">
          ${message}
        </blockquote>
        <p>We'll get back to you shortly.</p>
        <p>Best,<br>The Atomic Funding Team</p>
      `,
    });

    // Forward user details to admin inbox
    await transporter.sendMail({
      from: `"Atomic Bot" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,
      subject: "🔔 New Contact Form Submission",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Email sending failed:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
