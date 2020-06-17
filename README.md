[![view on npm](http://img.shields.io/npm/v/@uttori/plugin-vm-recent-documents.svg)](https://www.npmjs.com/package/@uttori/plugin-vm-recent-documents)
[![npm module downloads](http://img.shields.io/npm/dt/@uttori/plugin-vm-recent-documents.svg)](https://www.npmjs.com/package/@uttori/plugin-vm-recent-documents)
[![Build Status](https://travis-ci.org/uttori/uttori-plugin-vm-recent-documents.svg?branch=master)](https://travis-ci.org/uttori/uttori-plugin-vm-recent-documents)
[![Dependency Status](https://david-dm.org/uttori/uttori-plugin-vm-recent-documents.svg)](https://david-dm.org/uttori/uttori-plugin-vm-recent-documents)
[![Coverage Status](https://coveralls.io/repos/uttori/uttori-plugin-vm-recent-documents/badge.svg?branch=master)](https://coveralls.io/r/uttori/uttori-plugin-vm-recent-documents?branch=master)

# Uttori View Model Enrichment Plugin - Recent Documents

A plugin to expose and add recently edited documents to a view-model or other object.

## Install

```bash
npm install --save @uttori/plugin-vm-recent-documents
```

## Config

```js
{
  // Registration Events
  events: {
    callback: ['view-model-home'],
  },

  // Key to use in the view model
  key: 'recentDocuments',

  // Number of documents to return.
  limit: 10,

  // A list of slugs to ignore
  ignore_slugs: [],
}
```

* * *

## API Reference


* * *

## Tests

To run the test suite, first install the dependencies, then run `npm test`:

```bash
npm install
npm test
DEBUG=Uttori* npm test
```

## Contributors

* [Matthew Callis](https://github.com/MatthewCallis)

## License

* [MIT](LICENSE)
