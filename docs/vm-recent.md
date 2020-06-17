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
