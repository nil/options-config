export default {
  input: 'src/index.js',
  output: {
    file: 'dist/main.js',
    name: 'options-config',
    format: 'umd',
    globals: {
      'lodash.isequal': 'isEqual',
      'lodash.includes': 'includes'
    }
  },
  external: ['lodash.isequal', 'lodash.includes']
};
