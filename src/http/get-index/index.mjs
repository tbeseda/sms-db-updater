import arc from '@architect/functions';

const styles = /*css*/`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  margin: 5rem;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}
h1 {
  text-align: center;
  color: salmon;
  margin-bottom: 3rem;
}
details {
  position: absolute;
  bottom: 5rem;
  right: 5rem;
  color: gray;
}
`

export const handler = arc.http.async(async function () {
  const client = await arc.tables();
  const things = client.things;
  const bannerThing = await things.get({ thingID: 'site:BANNER' });

  return {
    html: /*html*/`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SMS to Dynamo</title>
    <style>${styles}</style>
  </head>
  <body>
    <h1>${bannerThing?.data?.text || null}</h1>
    <details>
      <summary>Banner data</summary>
      <pre>${JSON.stringify(bannerThing, null, 2)}</pre>
    </details>
  </body>
</html>
      `,
  };
});
