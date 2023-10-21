import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<any> {
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_LIQPAY_PUBLIC_KEY;
  const PRIVATE_KEY = process.env.LIQPAY_PRIVATE_KEY;
  const API_URL = 'https://www.liqpay.ua/api/request';
  const data = await req.json();
  const order_id = data.order_id;
  console.log('order_id :', order_id);

  const JSONPayload = {
    action: 'unsubscribe',
    version: 3,
    public_key: PUBLIC_KEY,
    order_id,
  };

  const base64EncodedData = Buffer.from(JSON.stringify(JSONPayload)).toString(
    'base64'
  );

  const dataToSign = `${PRIVATE_KEY}${base64EncodedData}${PRIVATE_KEY}`;

  const crypto = require('crypto');
  const signature = crypto
    .createHash('sha1')
    .update(dataToSign)
    .digest('base64');

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: new URLSearchParams({
        data: base64EncodedData,
        signature,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const responseText = await response.text();
    console.log('Result:', responseText);
    return NextResponse.json({ result: responseText }, { status: 200 });
  } catch (error) {
    console.log('error :', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
