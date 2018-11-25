import { terser } from 'rollup-plugin-terser';
import info from './package.json';

const bannerText = `/*!
 * ${info.name} v${info.version}
 * by ${info.author}
 */`;

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/main.js',
    name: 'optionsConfig',
    format: 'cjs',
    globals: {
      'custom-error': 'customError',
      'lodash.isequal': 'isEqual',
      'lodash.includes': 'includes',
      'lodash.isnumber': 'isNumber'
    },
    banner: bannerText
  },
  external: [
    'custom-error',
    'lodash.isequal',
    'lodash.includes',
    'lodash.isnumber'
  ],
  plugins: [
    terser({
      output: {
        comments: /^!/
      }
    })
  ]
};
