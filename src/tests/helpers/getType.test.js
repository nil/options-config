import { typeTest } from '../utils';

describe('getType', () => {
  typeTest('foo', 'string');
  typeTest(15, 'number');
  typeTest([1, 2], 'array');
  typeTest({ x: true, y: false }, 'object');
  typeTest(false, 'boolean');
  typeTest(undefined, 'undefined');
  typeTest(null, 'null');
  typeTest(a => a, 'function');
  typeTest(new Error(), 'error');
  typeTest(new Date(), 'date');
  typeTest(/a-z/, 'regexp');
});
