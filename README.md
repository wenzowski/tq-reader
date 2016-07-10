# TopicQuests Reader

## Installation

```bash
# clone it
$ git clone https://github.com/wenzowski/tq-reader.git

# Install dependencies
$ npm install
```

## Development

* Run script
```bash
# build files to './dev'
# start webpack development server
$ npm run dev
```
* If you're developing Inject page, please allow `https://localhost:3000` connections. (Because `chrome/extension/background/inject` injected an `https` page the webpack server procotol must be https.)
* [Load unpacked extensions](https://developer.chrome.com/extensions/getstarted#unpacked) with `./dev` folder.

#### React/Redux hot reload

This extension uses `Webpack`, `react-transform`, and `Redux`. As you edit files in the app folder changes will be streamed to the browser.

#### Using Redux DevTools Extension

The [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension) is available in development.

## Build

```bash
# build files to './build'
$ npm run build
```

## Compress

```bash
# compress build folder to {manifest.name}.zip and crx
$ npm run build
$ npm run compress -- [options]
```

#### Options

Pass the following options to build the `crx` file, and add `update.xml` url in [manifest.json](https://developer.chrome.com/extensions/autoupdate#update_url manifest.json).

* --app-id: your extension id (can be get it when you first release extension)
* --key: your private key path (default: './key.pem')  
  you can use `npm run keygen` to generate private key `./key.pem`
* --codebase: your `crx` file url

See [autoupdate guide](https://developer.chrome.com/extensions/autoupdate) for more information.

## LICENSE

[Apache 2.0](LICENSE)
