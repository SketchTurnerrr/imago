// 'use client';

// import { useState } from 'react';

// interface ILiqPay {
//   amount: number;
//   orderId: string;
//   disabled?: boolean;
//   title: string;
//   description: string;
//   subscribePeriodicity: string;
// }

// export const LiqPay = ({
//   amount,
//   subscribePeriodicity = 'month',
//   description = 'test',
//   orderId,
//   title = 'Subscribe',
//   disabled = false,
//   ...props
// }: ILiqPay) => {
//   const [signBase64, setSignBase64] = useState('');
//   // console.log('signBase64 :', signBase64);
//   const jsonString = {
//     public_key: process.env.LIQPAY_PUBLIC_KEY,
//     version: '3',
//     action: 'subscribe',
//     subscribe_date_start: Date.now(),
//     subscribe_periodicity: subscribePeriodicity,
//     amount: amount,
//     currency: 'uah',
//     description: description,
//     order_id: orderId,
//   };
//   const privateKey = process.env.NEXT_PUBLIC_LIQPAY_PRIVATE_KEY;
//   console.log('privateKey :', privateKey);

//   const encoder = new TextEncoder();
//   const dataBase64 = window.btoa(
//     unescape(encodeURIComponent(JSON.stringify(jsonString)))
//   );
//   console.log('dataBase64 :', dataBase64);

//   const signString = privateKey + dataBase64 + privateKey;
// console.log('signString :', signString);

// const digestSignature = async (signature: string) => {
//   const encoder = new TextEncoder();
//   const data = encoder.encode(signature);
//   const hash = await crypto.subtle.digest('SHA-1', data);
//   // return hash;

//   return Array.prototype.map
//     .call(new Uint8Array(hash), (x) => ('00' + x.toString(16)).slice(-2))
//     .join('');
// };

// const hash = digestSignature(signString).then((digestBuffer) => {
//   const signatureBase64 = window.btoa(
//     unescape(encodeURIComponent(JSON.stringify(digestBuffer)))
//   );
//   setSignBase64(signatureBase64);
// });
// console.log('digestSignature :', signBase64);
// const hashBuffer = window.crypto.subtle.digest('SHA-1', concatenatedBuffer);
// const signatureBase64 = btoa(hashBuffer);

//   return (
//     <form
//       method='POST'
//       action='https://www.liqpay.ua/api/3/checkout'
//       acceptCharset='utf-8'
//     >
//       <input type='hidden' name='data' value={dataBase64} />
//       <input type='hidden' name='signature' value={signBase64} />

//       <button disabled={disabled}>
//         <span>
//           {title} {amount} грн
//         </span>
//       </button>
//     </form>
//   );
// };
