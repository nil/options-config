import {
  testValidObject
} from '../utils';


/*
 * Default objects
 */

const oneItem = {
  x: {
    default: false
  }
};

const twoItems = {
  x: {
    default: 'foo'
  },
  y: {
    default: 20
  }
};

const twoLevels = {
  x: {
    x1: { default: [1, 2] },
    x2: { default: true }
  }
};

const twoLevelsDefault = {
  x: {
    default: {
      x1: { default: 100 },
      x2: { default: 'foo' }
    }
  }
};


/*
 * Tests
 */

describe('Only defaults', () => {
  describe('1 item', () => {
    testValidObject({
      name: '1 declaration',
      list: oneItem,
      input: { x: 'bar' }
    });
  });

  describe('2 items', () => {
    testValidObject({
      name: '1 declaration',
      list: twoItems,
      input: { x: { 1: 'yes' } },
      output: { x: { 1: 'yes' }, y: 20 }
    });

    testValidObject({
      name: '2 declarations',
      list: twoItems,
      input: { x: [10, 20], y: 'foo' }
    });
  });

  describe('2 levels', () => {
    testValidObject({
      name: '1 declaration',
      list: twoLevels,
      input: { x: { x1: true } },
      output: { x: { x1: true, x2: true } }
    });

    testValidObject({
      name: '2 declarations',
      list: twoLevels,
      input: { x: { x1: 100, x2: ['foo', 'bar'] } }
    });
  });

  describe('2 levels with default', () => {
    testValidObject({
      name: '1 declaration',
      list: twoLevelsDefault,
      input: { x: { x1: 15 } },
      output: { x: { x1: 15, x2: 'foo' } }
    });

    testValidObject({
      name: '2 declarations',
      list: twoLevelsDefault,
      input: { x: { x1: 'foo', x2: 47 } }
    });
  });
});
