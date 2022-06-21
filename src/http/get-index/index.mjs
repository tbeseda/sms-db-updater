import arc from '@architect/functions';
import stylesheet from './stylesheet.mjs';

export const handler = arc.http.async(async function () {
  const client = await arc.tables();
  const things = client.things;
  const banner = await things.get({ thingID: 'site:BANNER' });

  return {
    html: /*html*/ `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SMS to Dynamo</title>
    <style>${stylesheet}</style>
  </head>
  <body>
    ${banner?.data?.text ?
        `<h1 class="banner">${banner.data.text}</h1>`
        : ''
      }

    <h1>Welcome to my site</h1>
    <p>Lorem ipsum</p>

    <details>
      <summary>Banner data</summary>
      <pre>${JSON.stringify(banner, null, 2)}</pre>
    </details>
  </body>
</html>
      `,
  };
});
