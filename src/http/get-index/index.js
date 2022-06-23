const arc = require('@architect/functions');
const data = require('@begin/data');

async function handler() {
  let banner = await data.get({
    table: 'things',
    key: 'site:BANNER',
  });
  banner = banner.value || null;

  return {
    html: /*html*/ `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SMS to Dynamo</title>
    <link rel="stylesheet" href="/_static/styles.css">
  </head>
  <body>
    ${banner && banner.data && banner.data.text ?
        `<h1 class="banner">${banner.data.text}</h1>`
        : ''
      }

    <main>
      <h1>Welcome!</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <h2>About</h2>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </main>

    <details>
      <summary>Banner data</summary>
      <pre>${JSON.stringify(banner, null, 2)}</pre>
    </details>
  </body>
</html>
      `,
  };
}

exports.handler = arc.http.async(handler);
