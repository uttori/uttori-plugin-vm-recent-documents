const debug = require('debug')('Uttori.Plugin.ViewModel.RecentDocuments');
const R = require('ramda');

/**
 * Uttori View Model Enrichment - Recent Documents
 * @example <caption>ViewModelRecentDocuments</caption>
 * const viewModel = ViewModelRecentDocuments.callback(viewModel, context);
 * @class
 */
class ViewModelRecentDocuments {
  /**
   * The configuration key for plugin to look for in the provided configuration.
   * @return {String} The configuration key.
   * @example <caption>ViewModelRecentDocuments.configKey</caption>
   * const config = { ...ViewModelRecentDocuments.defaultConfig(), ...context.config[ViewModelRecentDocuments.configKey] };
   * @static
   */
  static get configKey() {
    return 'uttori-plugin-vm-recent-documents';
  }

  /**
   * The default configuration.
   * @return {Object} The configuration.
   * @example <caption>ViewModelRecentDocuments.defaultConfig()</caption>
   * const config = { ...ViewModelRecentDocuments.defaultConfig(), ...context.config[ViewModelRecentDocuments.configKey] };
   * @static
   */
  static defaultConfig() {
    return {
      // Key to use in the view model
      key: 'recentDocuments',

      // Number of documents to return.
      limit: 10,

      // Slugs to not consider when selecting the most recently edited documents.
      ignore_slugs: [],
    };
  }

  /**
   * Validates the provided configuration for required entries.
   * @param {Object} config - A configuration object.
   * @param {Object} config[ViewModelRecentDocuments.configKey] - A configuration object specifically for this plugin.
   * @param {String} config[ViewModelRecentDocuments.configKey].key - The that will be added to the passed in object and returned with the recent documents.
   * @param {String} config[ViewModelRecentDocuments.configKey].limit - The maximum number of documents to be returned.
   * @param {Object} _context - A Uttori-like context (unused).
   * @example <caption>ViewModelRecentDocuments.validateConfig(config, _context)</caption>
   * ViewModelRecentDocuments.validateConfig({ ... });
   * @static
   */
  static validateConfig(config, _context) {
    debug('Validating config...');
    if (!config[ViewModelRecentDocuments.configKey]) {
      const error = `Config Error: '${ViewModelRecentDocuments.configKey}' configuration key is missing.`;
      debug(error);
      throw new Error(error);
    }
    if (config[ViewModelRecentDocuments.configKey].key && typeof config[ViewModelRecentDocuments.configKey].key !== 'string') {
      const error = 'Config Error: `key` should be a valid Object key string.';
      debug(error);
      throw new Error(error);
    }
    if (config[ViewModelRecentDocuments.configKey].limit && typeof config[ViewModelRecentDocuments.configKey].limit !== 'number') {
      const error = 'Config Error: `limit` should be a number.';
      debug(error);
      throw new Error(error);
    }
    if (config[ViewModelRecentDocuments.configKey].ignore_slugs && !Array.isArray(config[ViewModelRecentDocuments.configKey].ignore_slugs)) {
      const error = 'Config Error: `ignore_slugs` is should be an array.';
      debug(error);
      throw new Error(error);
    }
    debug('Validated config.');
  }

  /**
   * Register the plugin with a provided set of events on a provided Hook system.
   * @param {Object} context - A Uttori-like context.
   * @param {Object} context.hooks - An event system / hook system to use.
   * @param {Function} context.hooks.on - An event registration function.
   * @param {Object} context.config - A provided configuration to use.
   * @param {Object} context.config.events - An object whose keys correspong to methods, and contents are events to listen for.
   * @example <caption>ViewModelRecentDocuments.register(context)</caption>
   * const context = {
   *   hooks: {
   *     on: (event, callback) => { ... },
   *   },
   *   config: {
   *     [ViewModelRecentDocuments.configKey]: {
   *       ...,
   *       events: {
   *         callback: ['document-save', 'document-delete'],
   *         validateConfig: ['validate-config'],
   *       },
   *     },
   *   },
   * };
   * ViewModelRecentDocuments.register(context);
   * @static
   */
  static register(context) {
    debug('register');
    if (!context || !context.hooks || typeof context.hooks.on !== 'function') {
      throw new Error("Missing event dispatcher in 'context.hooks.on(event, callback)' format.");
    }
    const config = { ...ViewModelRecentDocuments.defaultConfig(), ...context.config[ViewModelRecentDocuments.configKey] };
    if (!config.events) {
      throw new Error("Missing events to listen to for in 'config.events'.");
    }
    Object.keys(config.events).forEach((method) => {
      config.events[method].forEach((event) => context.hooks.on(event, ViewModelRecentDocuments[method]));
    });
  }

  /**
   * Queries for recent documents and searches the storage provider.
   * @param {Object} viewModel - A Uttori view-model object.
   * @param {Object} context - A Uttori-like context.
   * @param {Object} context.config - A provided configuration to use.
   * @param {String} context.config.key - The key to add the array of documents to on the view-model.
   * @param {Number} context.config.limit - The maximum number of documents to return.
   * @param {String[]} context.config.ignore_slugs - A list of slugs to not consider when fetching recent documents.
   * @param {Object} context.storageProvider - A provided Uttori StorageProvider instance.
   * @param {Function} context.storageProvider.getQuery - Access method for getting documents.
   * @return {Object} The provided view-model document.
   * @example <caption>ViewModelRecentDocuments.callback(viewModel, context)</caption>
   * const context = {
   *   config: {
   *     [ViewModelRecentDocuments.configKey]: {
   *       ...,
   *     },
   *   },
   *   storageProvider: {
   *     getQuery: (query) => { ... }
   *   },
   * };
   * ViewModelRecentDocuments.callback(viewModel, context);
   * @static
   */
  static async callback(viewModel, context) {
    debug('callback');
    const { key, limit, ignore_slugs } = { ...ViewModelRecentDocuments.defaultConfig(), ...context.config[ViewModelRecentDocuments.configKey] };
    debug(`key: "${key}", limit: ${limit}, ignore_slugs: [${ignore_slugs.join(',')}]`);
    if (limit < 1) {
      viewModel[key] = [];
      return viewModel;
    }
    let results = [];
    try {
      const not_in = `"${ignore_slugs.join('", "')}"`;
      results = await context.storageProvider.getQuery(`SELECT * FROM documents WHERE slug NOT_IN (${not_in}) ORDER BY updateDate DESC LIMIT ${limit}`);
    } catch (error) {
      /* istanbul ignore next */
      debug('Error:', error);
    }
    results = R.reject(R.isNil, results);
    debug('results:', results.length);
    viewModel[key] = results;
    return viewModel;
  }
}

module.exports = ViewModelRecentDocuments;
