import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("POST /api/liqpay");

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_LIQPAY_PUBLIC_KEY;
  const PRIVATE_KEY = process.env.LIQPAY_PRIVATE_KEY;

  const requestBody = await req.json();
  const periodicity = requestBody.periodicity;
  const amount = requestBody.amount;
  const orderId = requestBody.orderId;

  const description =
    periodicity === "month" ? "Підписка на місяць" : "Підписка на рік";

  const clientUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/profile/subscription"
      : `${BASE_URL}/profile/subscription`;

  const serverUrl =
    process.env.NODE_ENV === "development"
      ? "https://dee6-77-122-148-140.ngrok-free.app/api/liqpay/callback"
      : `https://covenantly-web.vercel.app/api/liqpay/callback`;

  console.log("serverUrl :", serverUrl);
  const JSONPayload = {
    public_key: PUBLIC_KEY,
    version: "3",
    action: "subscribe",
    subscribe_date_start: Date.now(),
    subscribe_periodicity: periodicity,
    amount: amount === 0 ? 77 : amount,
    currency: "UAH",
    description: description,
    language: "uk",
    order_id: orderId,
    result_url: clientUrl,
    server_url: serverUrl,
  };

  const base64EncodedData = Buffer.from(JSON.stringify(JSONPayload)).toString(
    "base64",
  );

  const dataToSign = `${PRIVATE_KEY}${base64EncodedData}${PRIVATE_KEY}`;

  const crypto = require("crypto");
  const signature = crypto
    .createHash("sha1")
    .update(dataToSign)
    .digest("base64");

  return NextResponse.json({
    signature,
    dataBase64: base64EncodedData,
  });
}
