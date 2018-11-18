// rollup.config.js

var babel = require('rollup-plugin-babel');
var common = require('./rollup.js');
var uglify = require('rollup-plugin-uglify');

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'cjs',
    // 如果不同时使用 export 与 export default 可打开legacy
    // legacy: true,
    banner: common.banner,
    // exports: 'named',
  },
  plugins: [
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
