const arc = require('@architect/functions');
const allowed = process.env.KNOWN_PHONES;

async function http(request) {
  // https://developer.vonage.com/api/sms#webhooks
  const message = request.body;
  const from = message.msisdn;

  if (allowed && from && allowed.indexOf(from) >= 0) {
    // background job to update banner message
    await arc.events.publish({
      name: 'new-sms',
      payload: message,
    });
  }

  // return 200 OK ASAP
  return { text: 'ty' };
}

exports.handler = arc.http.async(http);
