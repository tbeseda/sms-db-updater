import arc from '@architect/functions';
import fetch from 'node-fetch';

const {
  VONAGE_API_KEY: apiKey,
  VONAGE_API_SECRET: apiSecret,
  VONAGE_NUMBER,
} = process.env;
const sender = VONAGE_NUMBER?.trim();

export const handler = arc.events.subscribe(async function (payload) {
  if (!apiKey || !apiSecret || !sender) {
    console.log('Vonage API key and secret are required.');
    return;
  }
  const { to, text } = payload;
  console.log(
    `Sending SMS to <${to}> from <${sender}> with message: "${text}"`,
  );

  const response = await fetch(
    'https://rest.nexmo.com/sms/json',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        api_key: apiKey,
        api_secret: apiSecret,
        from: sender,
        to,
        text,
      }),
    },
  );

  const data = await response.json();

  console.log(data);

  return;
});
