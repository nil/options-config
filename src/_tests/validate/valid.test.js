import {
  testValidObject,
  testErrorObject
} from '../utils';


/*
 * Default objects
 */

const oneItem = {
  x: {
    default: 15,
    type: 'number',
    valid: [10, 15, 20, 25]
  }
};

const twoItems = {
  x: {
    default: [1, 2],
    type: 'array',
    valid: [[1, 2], [3, 4]]
  },
  y: {
    default: 'foo',
    valid: ['foo', 'bar', 100]
  }
};

const twoLevels = {
  x: {
    x1: {
      default: 'foo',
      valid: {
        string: ['foo', 'bar'],
        number: [15, 16, 17],
        boolean: true
      }
    },
    x2: {
      default: 25,
      valid: {
        boolean: [false, true],
        number: 'all'
      }
    }
  }
};

const twoLevelsDefault = {
  x: {
    default: {
      x1: {
        default: 100,
        valid: [50, 100, 150, 200]
      },
      x2: {
        default: 200,
        valid: [100, 200, 300, 400]
      }
    },
    type: 'number'
  }
};


/*
 * Tests
 */

describe('Valid', () => {
  describe('1 item', () => {
    testValidObject({
      name: 'Right value',
      list: oneItem,
      input: { x: 20 }
    });

    testErrorObject({
      name: 'Wrong value',
      list: oneItem,
      input: { x: 30 }
    });
  });

  describe('2 items', () => {
    testValidObject({
      name: 'All right values',
      list: twoItems,
      input: { x: [3, 4], y: 100 }
    });

    testErrorObject({
      name: '1 right value, 1 wrong value',
      list: twoItems,
      input: { x: [12, 13, 14], y: 'bar' }
    });

    testErrorObject({
      name: 'All wrong values',
      list: twoItems,
      input: { x: [15], y: false }
    });
  });

  describe('2 levels', () => {
    testValidObject({
      name: 'All right values',
      list: twoLevels,
      input: { x: { x1: true, x2: 10 } }
    });

    testErrorObject({
      name: '1 right value, 1 wrong value',
      list: twoLevels,
      input: { x: { x1: 'string', x2: false } }
    });

    testErrorObject({
      name: 'All wrong values',
      list: twoLevels,
      input: { x: { x1: 30, x2: 'foo' } }
    });
  });

  describe('2 levels with default', () => {
    testValidObject({
      name: 'All right values',
      list: twoLevelsDefault,
      input: { x: { x1: 150, x2: 400 } }
    });

    testErrorObject({
      name: '1 right value, 1 wrong value',
      list: twoLevelsDefault,
      input: { x: { x1: 50, x2: 250 } }
    });

    testErrorObject({
      name: 'All wrong values',
      list: twoLevelsDefault,
      input: { x: { x1: 25, x2: 40 } }
    });
  });
});
