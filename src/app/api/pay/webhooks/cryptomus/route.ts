import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function signMd5(b64: string, apiKey: string) {
  return crypto.createHash("md5").update(b64 + apiKey).digest("hex");
}
function signHmac(b64: string, apiKey: string) {
  return crypto.createHmac("sha256", apiKey).update(b64).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.CRYPTOMUS_API_KEY!;
    const receivedSign = req.headers.get("sign") || "";
    const raw = await req.text();
    const b64 = Buffer.from(raw).toString("base64");

    const calcSign = signMd5(b64, apiKey); // or signHmac
    if (calcSign !== receivedSign) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(raw);
    const status = payload?.status;
    const orderId = payload?.order_id;

    if (status === "paid" || status === "paid_over") {
      // TODO: mark orderId as paid in DB, provision MT5, email user
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
