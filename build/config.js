const path = require('path');
const flow = require('rollup-plugin-flow-no-whitespace');
const buble = require('rollup-plugin-buble');
const alias = require('rollup-plugin-alias');
const replace = require('rollup-plugin-replace');
const version = process.env.VERSION || require('../package.json').version;

const banner =
  '/*!\n' +
  ' * cosmos-vm.js v' + version + '\n' +
  ' * (c) 2014-' + new Date().getFullYear() + ' King Lion\n' +
  ' * Released under the MIT License.\n' +
  ' */';

const aliases = require('./alias')
const resolve = p => {
  const base = p.split('/')[0]
  if (aliases[base]) {
    return path.resolve(aliases[base], p.slice(base.length + 1))
  } else {
    return path.resolve(__dirname, '../', p)
  }
};

const builds = {
  // Runtime+compiler development build (Browser)
  'web-full-dev': {
    entry: resolve('src/index.js'),
    dest: resolve('dist/cosmos-vm.js'),
    format: 'umd',
    env: 'development',
    banner
  },
};

function genConfig(opts) {
  const config = {
    entry: opts.entry,
    dest: opts.dest,
    external: opts.external,
    format: opts.format,
    banner: opts.banner,
    moduleName: 'comcosVM',
    plugins: [
      flow(),
      buble(),
      alias(Object.assign({}, aliases, opts.alias))
    ].concat(opts.plugins || [])
  };

  if (opts.env) {
    config.plugins.push(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  }

  return config;
}

if (process.env.TARGET) {
  module.exports = genConfig(builds[process.env.TARGET])
} else {
  exports.getBuild = name => genConfig(builds[name])
  exports.getAllBuilds = () => Object.keys(builds).map(name => genConfig(builds[name]))
}
