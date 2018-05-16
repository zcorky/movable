import config from './rollup.config';

// ES output
config.output.format = 'es';
config.output.file = 'lib/index.esm.js';

export default config;
