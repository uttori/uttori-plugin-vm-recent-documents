/**
 * Uttori View Model Enrichment - Recent Documents
 * @example
 * <caption>ViewModelRecentDocuments</caption>
 * const viewModel = ViewModelRecentDocuments.callback(viewModel, context);
 */
declare class ViewModelRecentDocuments {
    /**
     * The configuration key for plugin to look for in the provided configuration.
     * @example
     * <caption>ViewModelRecentDocuments.configKey</caption>
     * const config = { ...ViewModelRecentDocuments.defaultConfig(), ...context.config[ViewModelRecentDocuments.configKey] };
     */
    static configKey: string;
    /**
     * The default configuration.
     * @example
     * <caption>ViewModelRecentDocuments.defaultConfig()</caption>
     * const config = { ...ViewModelRecentDocuments.defaultConfig(), ...context.config[ViewModelRecentDocuments.configKey] };
     * @returns The configuration.
     */
    static defaultConfig(): any;
    /**
     * Validates the provided configuration for required entries.
     * @example
     * <caption>ViewModelRecentDocuments.validateConfig(config, _context)</caption>
     * ViewModelRecentDocuments.validateConfig({ ... });
     * @param config - A configuration object.
     * @param config.configKey - A configuration object specifically for this plugin.
     * @param config.configKey.key - The that will be added to the passed in object and returned with the recent documents.
     * @param config.configKey.limit - The maximum number of documents to be returned.
     * @param _context - A Uttori-like context (unused).
     */
    static validateConfig(config: {
        configKey: {
            key: string;
            limit: string;
        };
    }, _context: any): void;
    /**
     * Register the plugin with a provided set of events on a provided Hook system.
     * @example
     * <caption>ViewModelRecentDocuments.register(context)</caption>
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
     * @param context - A Uttori-like context.
     * @param context.config - A provided configuration to use.
     * @param context.config.events - An object whose keys correspong to methods, and contents are events to listen for.
     * @param context.hooks - An event system / hook system to use.
     * @param context.hooks.on - An event registration function.
     */
    static register(context: {
        config: {
            events: any;
        };
        hooks: {
            on: (...params: any[]) => any;
        };
    }): void;
    /**
     * Queries for recent documents and searches the storage provider.
     * @example
     * <caption>ViewModelRecentDocuments.callback(viewModel, context)</caption>
     * const context = {
     *   config: {
     *     [ViewModelRecentDocuments.configKey]: {
     *       ...,
     *     },
     *   },
     *   hooks: {
     *     on: (event) => { ... },
     *     fetch: (event, query) => { ... },
     *   },
     * };
     * ViewModelRecentDocuments.callback(viewModel, context);
     * @param viewModel - A Uttori view-model object.
     * @param context - A Uttori-like context.
     * @param context.config - A provided configuration to use.
     * @param context.config.key - The key to add the array of documents to on the view-model.
     * @param context.config.limit - The maximum number of documents to return.
     * @param context.config.ignore_slugs - A list of slugs to not consider when fetching recent documents.
     * @param context.hooks - An event system / hook system to use.
     * @param context.hooks.on - An event registration function.
     * @param context.hooks.fetch - An event dispatch function that returns an array of results.
     * @returns The provided view-model document.
     */
    static callback(viewModel: any, context: {
        config: {
            key: string;
            limit: number;
            ignore_slugs: string[];
        };
        hooks: {
            on: (...params: any[]) => any;
            fetch: (...params: any[]) => any;
        };
    }): Promise<object>;
}

