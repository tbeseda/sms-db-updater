import arc from '@architect/functions';

const { GOOD_GUY_PHONES } = process.env;
const ALLOWED = new Set(GOOD_GUY_PHONES?.split(','));

async function http(request) {
  const { body: message } = request;
  const { msisdn: from, text } = message;

  if (ALLOWED.has(from)) {
    // background job to update banner message
    await arc.events.publish({
      name: 'inbound-sms',
      payload: { from, text },
    });
  }

  // return 200 OK ASAP
  return {
    statusCode: 200,
    headers: { 'content-type': 'text/xml' },
    body: 'ty',
  };
}

export const handler = arc.http.async(http);
