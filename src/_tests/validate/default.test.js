import {
  testValidObject
} from '../utils';


/*
 * Default objects
 */

const defaultKey = {
  x: {
    default: undefined
  },
  y: {
    default: 14
  },
  z: {
    default: 'foo'
  }
};

const defaultShortcuts = {
  a: new Date(1945, 12, 8),
  b: false,
  c: 'foo',
  d: 15,
  e: undefined,
  f: null,
  g: [1, 2],
  h: /\w/
};


/*
 * Tests
 */

describe('Only defaults', () => {
  describe('Default key', () => {
    testValidObject({
      name: 'Empty declaration',
      list: defaultKey,
      input: { },
      output: { x: undefined, y: 14, z: 'foo' }
    });

    testValidObject({
      name: 'Inexistent key',
      list: defaultKey,
      input: { a: 'bar' },
      output: { x: undefined, y: 14, z: 'foo' }
    });

    testValidObject({
      name: '1 declaration',
      list: defaultKey,
      input: { x: new Date() },
      output: { x: new Date(), y: 14, z: 'foo' }
    });

    testValidObject({
      name: '2 declaration',
      list: defaultKey,
      input: { x: { a: true }, z: [1, 2, 3] },
      output: { x: { a: true }, y: 14, z: [1, 2, 3] }
    });

    testValidObject({
      name: '3 declaration',
      list: defaultKey,
      input: { x: 'bar', y: 12, z: true }
    });
  });

  describe('Shortcuts', () => {
    testValidObject({
      name: 'Empty declaration',
      list: defaultShortcuts,
      input: { },
      output: {
        a: new Date(1945, 12, 8), b: false, c: 'foo', d: 15, e: undefined, f: null, g: [1, 2], h: /\w/
      }
    });

    testValidObject({
      name: '1st set of declarations',
      list: defaultShortcuts,
      input: {
        a: true, b: new Date(), c: null, d: { x: 1 }, e: 'bar', f: undefined, g: 15, h: [15, 16, 17]
      }
    });

    testValidObject({
      name: '2nd set of declarations',
      list: defaultShortcuts,
      input: {
        a: ['foo', 'bar'], b: 189, c: true, d: undefined, e: 'world', f: /\d{3}/, g: new Date(), h: null
      }
    });
  });
});
