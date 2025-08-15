// app/api/pay/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function parseUsd(price: string) {
  return Number(String(price).replace(/[^0-9.]/g, ""));
}

// Cryptomus helpers
function base64Json(obj: any) {
  return Buffer.from(JSON.stringify(obj)).toString("base64");
}
function signMd5(b64: string, apiKey: string) {
  return crypto.createHash("md5").update(b64 + apiKey).digest("hex");
}
function signHmac(b64: string, apiKey: string) {
  return crypto.createHmac("sha256", apiKey).update(b64).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const { provider, type, size, price, option } = await req.json();

    const amount = parseUsd(price);
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    if (provider === "cryptomus") {
      const merchant = process.env.CRYPTOMUS_MERCHANT_ID!;
      const apiKey = process.env.CRYPTOMUS_API_KEY!;
      const baseUrl = process.env.CRYPTOMUS_BASE_URL || "https://api.cryptomus.com";
      const callbackUrl = process.env.CRYPTOMUS_CALLBACK_URL!;
      const successUrl = process.env.CRYPTOMUS_SUCCESS_URL!;
      const currency = process.env.CRYPTOMUS_CURRENCY || "USD";

      const payload = {
        amount: amount.toFixed(2),
        currency,
        order_id: `AF-${type}-${size}-${Date.now()}`,
        description: `${size} ${type === "instant" ? "Instant Funded" : "1-Step Challenge"}`,
        url_callback: callbackUrl,
        url_success: successUrl,
      };

      const b64 = base64Json(payload);
      const apiKeyUsed = apiKey;
      const signature = signMd5(b64, apiKeyUsed); // or signHmac if required

      const res = await fetch(`${baseUrl}/v1/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          merchant,
          sign: signature,
        },
        body: JSON.stringify({ payload: b64 }),
        cache: "no-store",
      });

      const data = await res.json();
      const url = data?.url || data?.result?.url;
      if (!url) throw new Error("No redirect URL from Cryptomus");
      return NextResponse.json({ url });
    }

    if (provider === "nowpayments") {
      const apiKey = process.env.NOWPAYMENTS_API_KEY!;
      const baseUrl = process.env.NOWPAYMENTS_BASE_URL || "https://api.nowpayments.io";
      const callbackUrl = process.env.NOWPAYMENTS_CALLBACK_URL!;
      const successUrl = process.env.NOWPAYMENTS_SUCCESS_URL!;
      const priceCurrency = process.env.NOWPAYMENTS_PRICE_CURRENCY || "USD";

      const payCurrencyMap: Record<string, string> = {
        usdt: "USDT",
        btc: "BTC",
        eth: "ETH",
      };
      const pay_currency = option && payCurrencyMap[option.toLowerCase()] ? payCurrencyMap[option.toLowerCase()] : undefined;

      const payload: any = {
        price_amount: Number(amount.toFixed(2)),
        price_currency: priceCurrency,
        order_id: `AF-${type}-${size}-${Date.now()}`,
        order_description: `${size} ${type === "instant" ? "Instant Funded" : "1-Step Challenge"}`,
        ipn_callback_url: callbackUrl,
        success_url: successUrl,
      };
      if (pay_currency) payload.pay_currency = pay_currency;

      const res = await fetch(`${baseUrl}/v1/payment`, {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      const data = await res.json();
      const url = data?.invoice_url || data?.payment_url;
      if (!url) throw new Error("No redirect URL from NOWPayments");
      return NextResponse.json({ url });
    }

    return NextResponse.json({ error: "Unknown provider" }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}
