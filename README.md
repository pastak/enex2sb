# It has been moved [`scrapbox-converter` mono-repo](https://github.com/pastak/scrapbox-converter/tree/master/packages/enex2sb) and this repo is archived.


# enex2sb
Encode XML exported by Evernote to Scrapbox.io style importable json

## Usage

### CLI

You should set `GYAZO_ACCESS_TOKEN` to OAuth access token get from https://gyazo.com/oauth/applications before exec command.(It uses to upload embeded images to gyazo.com)

- `% npm install -g enex2sb`
- `% nenx2sb hoge.enex > hoge.json`
  - You can pass filename as option
- `% cat hoge.enex | enex2sb > hoge.json`

### Compatibility

`enex2sb` requires `babel-polyfill` but since `babel-polyfill` can only be used
once (singleton) this means that you need to add it to your end product.

### API

TBW

## Development

- Require
  - NodeJS
  - yarn

1. Fork it
2. `% git clone git@github.com:YOUR-NAME/enex2sb.git`
3. `% cd enex2sb`
4. `% git checkout -b YOUR_WORKING_BRANCH`
5. Write Some Code!
  - Build: `% yarn run build`
    - Watch: `% yarn run watch`
  - Test: `% yarn test`
    - Test Watching: `% yarn test:watch`
6. Commit your work
7. Open PR to this repository 🎉
