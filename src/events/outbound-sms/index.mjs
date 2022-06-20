import arc from '@architect/functions';
import Vonage from '@vonage/server-sdk';

const {
  VONAGE_API_KEY: apiKey,
  VONAGE_API_SECRET: apiSecret,
  VONAGE_PHONE_NUMBER,
} = process.env;
const from = VONAGE_PHONE_NUMBER?.trim();

export const handler = arc.events.subscribe(async function (payload) {
  if (!apiKey || !apiSecret || !from) {
    console.log('Vonage API key and secret are required.');
    return;
  }
  const vonage = new Vonage({ apiKey, apiSecret });
  const { to, text } = payload;

  vonage.message.sendSms(
    from,
    to,
    text,
    {},
    (vonageError, responseData) => {
      if (vonageError) {
        console.log(vonageError);
      } else {
        if (responseData.messages[0]['status'] === '0') {
          console.log('Message sent successfully.');
        } else {
          console.log(
            `Message failed with error`,
            responseData.messages[0]['error-text'],
          );
        }
      }
    },
  );

  return;
});
