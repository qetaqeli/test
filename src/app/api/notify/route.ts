import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ success: false, error: "Missing email" }, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send confirmation to client
    await transporter.sendMail({
      from: `"Atomic Funding" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "You're on the early access list 🎉",
      html: `
        <p>Thanks for signing up early! Your 25% discount is locked in — you’ll be among the first to access our revolutionary HFT-friendly prop firm when we go live.</p>

        <p>We’re building something designed for serious traders like you:</p>
        <ul>
          <li>✅ High-frequency + EA trading allowed</li>
          <li>✅ Instant funding options</li>
          <li>✅ No challenge models</li>
          <li>✅ Lightning-fast execution with premium broker partners</li>
        </ul>

        <p>🔥 Your exclusive 25% off will be valid on all funding options at launch.</p>
        <p>Keep an eye on your inbox — we’ll notify you the moment we open the gates.</p>

        <p>Thanks again for being early.<br><strong>You're on the inside now.</strong></p>
      `,
    });

    // Optional: Forward email to your inbox
    await transporter.sendMail({
      from: `"Atomic Notify" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,
      subject: "✅ New Early Notification Signup",
      html: `<p><strong>Email:</strong> ${email}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Notify Email error:", err);
    return NextResponse.json({ success: false, error: "Email failed" }, { status: 500 });
  }
}
