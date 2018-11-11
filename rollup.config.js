import { terser } from 'rollup-plugin-terser';

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
    banner: `/*!
 * options-config v1.2.0
 * by Nil Vila
 */`
  },
  external: ['lodash.isequal', 'lodash.includes'],
  plugins: [terser({
    output: {
      comments: /^!/
    }
  })]
};
