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
    name: 'options-config',
    format: 'umd',
    globals: {
      'lodash.isequal': 'isEqual',
      'lodash.includes': 'includes'
    },
    banner: bannerText
  },
  external: ['lodash.isequal', 'lodash.includes'],
  plugins: [terser(
    {
      output: {
        comments: /^!/
      }
    }
  )]
};
