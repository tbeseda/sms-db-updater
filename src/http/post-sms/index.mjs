import arc from '@architect/functions';

const { KNOWN_PHONES } = process.env;
const ALLOWED = new Set(KNOWN_PHONES?.split(','));

async function http(request) {
  // https://developer.vonage.com/api/sms#webhooks
  const { body: message } = request;
  const { msisdn } = message;

  if (ALLOWED.has(msisdn)) {
    // background job to update banner message
    await arc.events.publish({
      name: 'new-sms',
      payload: message,
    });
  }

  // return 200 OK ASAP
  return {
    statusCode: 200,
    headers: { 'content-type': 'text/plain' },
    body: 'ty',
  };
}

export const handler = arc.http.async(http);
