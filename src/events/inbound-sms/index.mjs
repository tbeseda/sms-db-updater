import arc from '@architect/functions';

export const handler = arc.events.subscribe(async function (payload) {
  // https://developer.vonage.com/api/sms#webhooks
  const { from, text } = payload;

  let reply = '';

  const tables = await arc.tables();
  const { things } = tables;
  const bannerThing = {
    thingID: 'site:BANNER',
    data: null,
    updatedAt: Date.now(),
  };

  if (text.toLowerCase().startsWith('reset')) {
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
