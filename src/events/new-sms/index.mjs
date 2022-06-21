import arc from '@architect/functions';
import fetch from 'node-fetch';

const {
  VONAGE_API_KEY: apiKey,
  VONAGE_API_SECRET: apiSecret,
  VONAGE_NUMBER,
} = process.env;
const sender = VONAGE_NUMBER?.trim();

async function subscriber(payload) {
  // https://developer.vonage.com/api/sms#webhooks
  const { msisdn: from, text } = payload;

  const tables = await arc.tables();
  const { things } = tables;
  const bannerThing = {
    thingID: 'site:BANNER',
    data: null,
    updatedAt: Date.now(),
  };

  let reply;
  if (text.toLowerCase().startsWith('reset')) {
    reply = 'Banner message reset.';
  } else {
    bannerThing.data = payload;
    reply = 'Updated banner message.';
  }

  await things.put(bannerThing);

  if (!apiKey || !apiSecret || !sender) {
    console.log('Vonage API key and secret are required.');
    return;
  }
  console.log(
    `Sending SMS to <${from}> from <${sender}> with message: "${text}"`,
  );

  const vonageResponse = await fetch(
    'https://rest.nexmo.com/sms/json',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        api_key: apiKey,
        api_secret: apiSecret,
        from: sender,
        to: from,
        text: reply,
      }),
    },
  );

  const vonageResult = await vonageResponse.json();

  console.log(vonageResult);

  return;
}

export const handler = arc.events.subscribe(subscriber);
