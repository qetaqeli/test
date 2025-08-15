import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET!;
    const signature = req.headers.get("x-nowpayments-sig") || "";
    const rawBody = await req.text();

    const calcSig = crypto
      .createHmac("sha512", ipnSecret)
      .update(rawBody)
      .digest("hex");

    if (calcSig !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const status = payload?.payment_status;
    const orderId = payload?.order_id;

    if (status === "finished" || status === "confirmed") {
      // TODO: mark orderId as paid in DB, provision MT5, email user
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
