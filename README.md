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
└──/white-cat/
     ├──image.png
     ├──index.html
     └──/directory-a/
          └──file.html
```

***index.js***
```js
const localhost = require('local-routes');

const routesPath = __dirname + '/white-cat';
const routeDirnamePath = __dirname;

localhost.initServer(routesPath, routeDirnamePath);
```
In this case, the files will be available in the browser at:
- `http://localhost:3000/white-cat/image.png`
- `http://localhost:3000/white-cat/index.html`
- `http://localhost:3000/white-cat/directory-a/file.html`

<br>**Please note that `http://localhost:3000` will not be available, if you want to add a file as the main one, do this:**
```js
const localhost = require('local-routes');

const routesPath = __dirname + '/white-cat';
const routeDirnamePath = __dirname;
const mainFilePath = __dirname + '/white-cat/index.html';

localhost.initServer(routesPath, routeDirnamePath, mainFilePath);
```

## Links

- [GitHub](https://github.com/Kirigod/local-routes)
- [NPM](https://www.npmjs.com/package/local-routes)

## Help

If you are experiencing problems, or you just need a nudge in the right direction, please do not hesitate to create a New Issue on [Github](https://github.com/Kirigod/local-routes) repository.