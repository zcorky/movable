// rollup.config.js

const babel = require("rollup-plugin-babel");
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');

const common = require('./rollup.js');
const name = common.name.split('/').length > 1 ? common.name.split('/').pop() : common.name;
const banner = common.banner;

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/index.umd.js',
    format: 'umd',
    // 如果不同时使用 export 与 export default 可打开legacy
    // legacy: true,
    name,
    banner,
    // exports: 'named',
  },
  plugins: [
    nodeResolve({
      main: true
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    }),
    uglify({
      compress: {
        drop_console: true,
        pure_funcs: ['console.log'],
      },
      ie8: false,
    }),
  ]
};
