import arc from '@architect/functions';
const { KNOWN_PHONES } = process.env;

async function http(request) {
  // https://developer.vonage.com/api/sms#webhooks
  const message = request.body;
  const from = message.msisdn;

  if (
    from &&
    KNOWN_PHONES &&
    KNOWN_PHONES.indexOf(from) >= 0
  ) {
    // background job to update banner message
    await arc.events.publish({
      name: 'new-sms',
      payload: message,
    });
  }

  // return 200 OK ASAP
  return { text: 'ty' };
}

export const handler = arc.http.async(http);
