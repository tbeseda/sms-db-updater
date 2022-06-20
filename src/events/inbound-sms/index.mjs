const arc = require('@architect/functions');

export const handler = arc.events.subscribe(async function (payload) {
  // https://developer.vonage.com/messaging/sms/guides/inbound-sms#anatomy-of-an-inbound-message
  // https://developer.vonage.com/api/sms#webhooks
  /*
    {
      "api-key": "abcd1234",
      "msisdn": "447700900001",
      "to": "447700900000",
      "messageId": "0A0000000123ABCD1",
      "text": "Hello world",
      "type": "text",
      "keyword": "HELLO",
      "message-timestamp": "2020-01-01 12:00:00 +0000",
      "timestamp": "1578787200",
      "nonce": "aaaaaaaa-bbbb-cccc-dddd-0123456789ab",
      "concat": "true",
      "concat-ref": "1",
      "concat-total": "3",
      "concat-part": "2"
    }
  */
  const { from, text } = payload;

  let reply = '';

  const tables = await arc.tables();
  const { things } = tables;
  const bannerThing = {
    thingID: 'site:BANNER',
    data: null,
    updatedAt: Date.now(),
  };

  if (text.startsWith('reset')) {
    reply = 'Banner message reset.';
  } else {
    bannerThing.data = payload;
    reply = 'Updated banner message.';
  }

  await things.put(bannerThing);
  await arc.events.publish({
    name: 'outbound-sms',
    payload: { to: from, text: reply },
  });

  return;
});
