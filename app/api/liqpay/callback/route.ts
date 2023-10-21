import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import format from 'date-fns/format';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

function verifySignature(
  privateKey: string | undefined,
  data: FormDataEntryValue | null,
  receivedSignature: FormDataEntryValue | null
) {
  if (receivedSignature && data && privateKey) {
    const calculatedSignature = crypto
      .createHash('sha1')
      .update(privateKey + data + privateKey, 'utf8')
      .digest('base64');

    return calculatedSignature === receivedSignature;
  }
}

function decodeBase64Data(encodedData: string) {
  const decodedData = Buffer.from(encodedData, 'base64').toString('utf8');
  return JSON.parse(decodedData);
}

export async function POST(req: NextRequest): Promise<any> {
  try {
    const formData = await req.formData();
    const data = formData.get('data');
    const signature = formData.get('signature');

    // Replace 'yourPrivateKey' with your actual private key from LiqPay
    const privateKey = process.env.LIQPAY_PRIVATE_KEY;

    if (verifySignature(privateKey, data, signature)) {
      // The signature is valid, so I can trust the data
      const decodedData = decodeBase64Data(String(data));
      // Process the decoded data as needed
      if (decodedData.status === 'subscribed') {
        const cookieStore = cookies();
        console.log('cookiesList :', cookieStore.getAll());

        const supabase = createRouteHandlerClient<Database>({
          cookies: () => cookieStore,
        });

        const { error } = await supabase.from('subscriptions').insert({
          profile_id: decodedData.order_id,
          transaction_id: decodedData.transaction_id,
          liqpay_order_id: decodedData.liqpay_order_id,
          amount: decodedData.amount,
          description: decodedData.description,
          end_date: format(decodedData.end_date, 'yyyy-MM-dd'),
        });
        console.log('error :', error);
        return NextResponse.json({ msg: 'done' });
      }
    } else {
      return NextResponse.json({ error: 'Invalid signature' });
    }
  } catch (error) {
    return NextResponse.json(
      { error },
      { status: 403, statusText: 'forbidden' }
    );
  }
}
