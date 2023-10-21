interface ILiqPay {
  orderId: string;
  periodicity: string;
  amount: number;
}
export const liqpaySignature = async ({
  periodicity = 'month',
  orderId,
  amount = 77,
}: ILiqPay) => {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;
  const description =
    periodicity === 'month' ? 'Підписка на місяць' : 'Підписка на рік';

  const clientUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/profile/subscription'
      : `${BASE_URL}/profile/subscription`;

  const serverUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/liqpay/callback'
      : `${BASE_URL}`;

  console.log('serverUrl :', serverUrl);
  const data = {
    public_key: process.env.NEXT_PUBLIC_LIQPAY_PUBLIC_KEY,
    version: '3',
    action: 'subscribe',
    subscribe_date_start: Date.now(),
    subscribe_periodicity: periodicity,
    amount: amount === 0 ? 77 : amount,
    currency: 'UAH',
    description: description,
    language: 'uk',
    order_id: orderId,
    result_url: clientUrl,
    server_url:
      'https://0f78-77-122-148-140.ngrok-free.app/api/liqpay/callback',
  };
  const privateKey = process.env.LIQPAY_PRIVATE_KEY;
  console.log('privateKey :', privateKey);

  const dataBase64 = window.btoa(
    unescape(encodeURIComponent(JSON.stringify(data)))
  );

  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(dataBase64);
  const keyBuffer = encoder.encode(process.env.NEXT_PUBLIC_LIQPAY_PRIVATE_KEY);
  const concatenatedBuffer = new Uint8Array(
    keyBuffer.length + dataBuffer.length + keyBuffer.length
  );
  concatenatedBuffer.set(keyBuffer, 0);
  concatenatedBuffer.set(dataBuffer, keyBuffer.length);
  concatenatedBuffer.set(keyBuffer, keyBuffer.length + dataBuffer.length);

  const hashBuffer = await window.crypto.subtle.digest(
    'SHA-1',
    concatenatedBuffer
  );
  const signatureBase64 = btoa(
    String.fromCharCode(...new Uint8Array(hashBuffer))
  );

  return {
    dataBase64,
    signatureBase64,
  };
};
