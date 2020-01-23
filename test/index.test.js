/* eslint-disable security/detect-non-literal-fs-filename */
const test = require('ava');
const ViewModelRecentDocuments = require('../src');

const config = {
  [ViewModelRecentDocuments.configKey]: {
    ...ViewModelRecentDocuments.defaultConfig(),
    events: [],
    key: 'editedDocs',
    limit: 1,
  },
};
const storageProvider = {
  getQuery: (_query) => [
    {
      updateDate: null,
      createDate: new Date('2019-04-20').toISOString(),
      slug: 'good-title',
    },
    {
      updateDate: new Date('2019-04-21').toISOString(),
      createDate: new Date('2019-04-21').toISOString(),
      slug: 'fake-title',
    },
  ],
};

test('ViewModelRecentDocuments.register(context): can register', (t) => {
  t.notThrows(() => {
    ViewModelRecentDocuments.register({ hooks: { on: () => {} }, config: { [ViewModelRecentDocuments.configKey]: { events: { callback: [] } } } });
  });
});

test('ViewModelRecentDocuments.register(context): errors without event dispatcher', (t) => {
  t.throws(() => {
    ViewModelRecentDocuments.register({ hooks: {} });
  }, { message: 'Missing event dispatcher in \'context.hooks.on(event, callback)\' format.' });
});

test('ViewModelRecentDocuments.register(context): errors without events', (t) => {
  t.throws(() => {
    ViewModelRecentDocuments.register({ hooks: { on: () => {} }, config: { [ViewModelRecentDocuments.configKey]: { } } });
  }, { message: 'Missing events to listen to for in \'config.events\'.' });
});

test('ViewModelRecentDocuments.defaultConfig(): can return a default config', (t) => {
  t.notThrows(ViewModelRecentDocuments.defaultConfig);
});

test('ViewModelRecentDocuments.validateConfig(config, _context): throws when configuration key is missing', (t) => {
  t.throws(() => {
    ViewModelRecentDocuments.validateConfig({});
  }, { message: 'Config Error: \'uttori-plugin-vm-recent-documents\' configuration key is missing.' });
});

test('ViewModelRecentDocuments.validateConfig(config, _context): throws when ignore_slugs is not an array', (t) => {
  t.throws(() => {
    ViewModelRecentDocuments.validateConfig({
      [ViewModelRecentDocuments.configKey]: {
        ignore_slugs: {},
      },
    });
  }, { message: 'Config Error: `ignore_slugs` is should be an array.' });
});

test('ViewModelRecentDocuments.validateConfig(config, _context): throws when limit is not a number', (t) => {
  t.throws(() => {
    ViewModelRecentDocuments.validateConfig({
      [ViewModelRecentDocuments.configKey]: {
        limit: '10',
      },
    });
  }, { message: 'Config Error: `limit` should be a number.' });
});

test('ViewModelRecentDocuments.validateConfig(config, _context): throws when key is not a string', (t) => {
  t.throws(() => {
    ViewModelRecentDocuments.validateConfig({
      [ViewModelRecentDocuments.configKey]: {
        key: 10,
      },
    });
  }, { message: 'Config Error: `key` should be a valid Object key string.' });
});

test('ViewModelRecentDocuments.validateConfig(config, _context): can validate', (t) => {
  t.notThrows(() => {
    ViewModelRecentDocuments.validateConfig({
      [ViewModelRecentDocuments.configKey]: {
        key: 'popularDocuments',
        limit: 10,
        ignore_slugs: ['home-page'],
      },
    });
  });
});

test('ViewModelRecentDocuments.callback(viewModel, context): adds an empty array when limit is less than 1', async (t) => {
  t.plan(1);
  const viewModel = {};
  const output = await ViewModelRecentDocuments.callback(viewModel, { config: { ...config, [ViewModelRecentDocuments.configKey]: { key: 'editedDocs', limit: 0 } }, storageProvider });
  t.deepEqual(output, {
    editedDocs: [],
  });
});

test('ViewModelRecentDocuments.callback(viewModel, context): can return recent documents', async (t) => {
  t.plan(1);
  const viewModel = {};
  const output = await ViewModelRecentDocuments.callback(viewModel, { config, storageProvider });
  t.deepEqual(output, {
    editedDocs: [
      {
        updateDate: null,
        createDate: new Date('2019-04-20').toISOString(),
        slug: 'good-title',
      },
      {
        updateDate: new Date('2019-04-21').toISOString(),
        createDate: new Date('2019-04-21').toISOString(),
        slug: 'fake-title',
      },
    ],
  });
});
