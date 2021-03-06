<div align="center">
  <br>
  <h1>local-routes</h1>
  <p>
    <a href="https://www.npmjs.com/package/local-routes"><img src="https://nodei.co/npm/local-routes.png" alt="npm installnfo"/></a>
  </p>
</div>

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Example Usage](#example-usage)
- [Links](#links)
- [Help](#help)

## About

local-routes is a package that allows access to the localhost using directory-based routes simply and quickly.

## Installation

**[Node.js](https://nodejs.org) v14.16.1 or newer is recommended.**  

Install: `npm install local-routes`

## Example usage

***Example directory***
```code
.
├──index.js
├──package.json
└──/src/
     ├──image.png
     ├──index.html
     └──/directory-a/
          └──file.html
```

***index.js***
```js
const localhost = require('local-routes');

localhost.run({dirname: __dirname + "/src"/*, host: "127.0.0.1", port: 8080*/});
```
In this case, the files will be available in the browser at:
- `http://localhost:3000/image.png`
- `http://localhost:3000/index.html`
- `http://localhost:3000/directory-a/file.html`

## Links

- [GitHub](https://github.com/Kirigod/local-routes)
- [NPM](https://www.npmjs.com/package/local-routes)

## Help

If you are experiencing problems, or you just need a nudge in the right direction, please do not hesitate to create a New Issue on [Github](https://github.com/Kirigod/local-routes) repository.
