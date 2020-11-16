[![view on npm](https://img.shields.io/npm/v/@uttori/plugin-vm-recent-documents.svg)](https://www.npmjs.com/package/@uttori/plugin-vm-recent-documents)
[![npm module downloads](https://img.shields.io/npm/dt/@uttori/plugin-vm-recent-documents.svg)](https://www.npmjs.com/package/@uttori/plugin-vm-recent-documents)
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

<a name="ViewModelRecentDocuments"></a>

## ViewModelRecentDocuments
Uttori View Model Enrichment - Recent Documents

**Kind**: global class  

* [ViewModelRecentDocuments](#ViewModelRecentDocuments)
    * [.configKey](#ViewModelRecentDocuments.configKey) ⇒ <code>string</code>
    * [.defaultConfig()](#ViewModelRecentDocuments.defaultConfig) ⇒ <code>object</code>
    * [.validateConfig(config, _context)](#ViewModelRecentDocuments.validateConfig)
    * [.register(context)](#ViewModelRecentDocuments.register)
    * [.callback(viewModel, context)](#ViewModelRecentDocuments.callback) ⇒ <code>Promise.&lt;object&gt;</code>

<a name="ViewModelRecentDocuments.configKey"></a>

### ViewModelRecentDocuments.configKey ⇒ <code>string</code>
The configuration key for plugin to look for in the provided configuration.

**Kind**: static property of [<code>ViewModelRecentDocuments</code>](#ViewModelRecentDocuments)  
**Returns**: <code>string</code> - The configuration key.  
**Example** *(ViewModelRecentDocuments.configKey)*  
```js
const config = { ...ViewModelRecentDocuments.defaultConfig(), ...context.config[ViewModelRecentDocuments.configKey] };
```
<a name="ViewModelRecentDocuments.defaultConfig"></a>

### ViewModelRecentDocuments.defaultConfig() ⇒ <code>object</code>
The default configuration.

**Kind**: static method of [<code>ViewModelRecentDocuments</code>](#ViewModelRecentDocuments)  
**Returns**: <code>object</code> - The configuration.  
**Example** *(ViewModelRecentDocuments.defaultConfig())*  
```js
const config = { ...ViewModelRecentDocuments.defaultConfig(), ...context.config[ViewModelRecentDocuments.configKey] };
```
<a name="ViewModelRecentDocuments.validateConfig"></a>

### ViewModelRecentDocuments.validateConfig(config, _context)
Validates the provided configuration for required entries.

**Kind**: static method of [<code>ViewModelRecentDocuments</code>](#ViewModelRecentDocuments)  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | A configuration object. |
| config.configKey | <code>object</code> | A configuration object specifically for this plugin. |
| config.configKey.key | <code>string</code> | The that will be added to the passed in object and returned with the recent documents. |
| config.configKey.limit | <code>string</code> | The maximum number of documents to be returned. |
| _context | <code>object</code> | A Uttori-like context (unused). |

**Example** *(ViewModelRecentDocuments.validateConfig(config, _context))*  
```js
ViewModelRecentDocuments.validateConfig({ ... });
```
<a name="ViewModelRecentDocuments.register"></a>

### ViewModelRecentDocuments.register(context)
Register the plugin with a provided set of events on a provided Hook system.

**Kind**: static method of [<code>ViewModelRecentDocuments</code>](#ViewModelRecentDocuments)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | A Uttori-like context. |
| context.config | <code>object</code> | A provided configuration to use. |
| context.config.events | <code>object</code> | An object whose keys correspong to methods, and contents are events to listen for. |
| context.hooks | <code>object</code> | An event system / hook system to use. |
| context.hooks.on | <code>function</code> | An event registration function. |

**Example** *(ViewModelRecentDocuments.register(context))*  
```js
const context = {
  hooks: {
    on: (event, callback) => { ... },
  },
  config: {
    [ViewModelRecentDocuments.configKey]: {
      ...,
      events: {
        callback: ['document-save', 'document-delete'],
        validateConfig: ['validate-config'],
      },
    },
  },
};
ViewModelRecentDocuments.register(context);
```
<a name="ViewModelRecentDocuments.callback"></a>

### ViewModelRecentDocuments.callback(viewModel, context) ⇒ <code>Promise.&lt;object&gt;</code>
Queries for recent documents and searches the storage provider.

**Kind**: static method of [<code>ViewModelRecentDocuments</code>](#ViewModelRecentDocuments)  
**Returns**: <code>Promise.&lt;object&gt;</code> - The provided view-model document.  

| Param | Type | Description |
| --- | --- | --- |
| viewModel | <code>object</code> | A Uttori view-model object. |
| context | <code>object</code> | A Uttori-like context. |
| context.config | <code>object</code> | A provided configuration to use. |
| context.config.key | <code>string</code> | The key to add the array of documents to on the view-model. |
| context.config.limit | <code>number</code> | The maximum number of documents to return. |
| context.config.ignore_slugs | <code>Array.&lt;string&gt;</code> | A list of slugs to not consider when fetching recent documents. |
| context.hooks | <code>object</code> | An event system / hook system to use. |
| context.hooks.on | <code>function</code> | An event registration function. |
| context.hooks.fetch | <code>function</code> | An event dispatch function that returns an array of results. |

**Example** *(ViewModelRecentDocuments.callback(viewModel, context))*  
```js
const context = {
  config: {
    [ViewModelRecentDocuments.configKey]: {
      ...,
    },
  },
  hooks: {
    on: (event) => { ... },
    fetch: (event, query) => { ... },
  },
};
ViewModelRecentDocuments.callback(viewModel, context);
```

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
