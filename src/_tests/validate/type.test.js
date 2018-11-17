import {
  testValidObject,
  testErrorObject
} from '../utils';


/*
 * Default objects
 */

const oneItem = {
  x: {
    default: true,
    type: 'boolean'
  }
};

const twoItems = {
  x: {
    default: 15,
    type: 'number'
  },
  y: {
    default: 'foo',
    type: 'string'
  }
};

const twoLevels = {
  x: {
    x1: {
      default: 'foo',
      type: 'string'
    },
    x2: {
      default: [1, 2],
      type: 'array'
    }
  }
};

const twoLevelsDefault = {
  x: {
    default: {
      x1: { default: 100 },
      x2: { default: 200 }
    },
    type: 'number'
  }
};


/*
 * Tests
 */

describe('Type', () => {
  describe('1 item', () => {
    testValidObject({
      name: 'Right type',
      list: oneItem,
      input: { x: false }
    });

    testErrorObject({
      name: 'Wrong type',
      list: oneItem,
      input: { x: 'bar' }
    });
  });

  describe('2 items', () => {
    testValidObject({
      name: 'All right values',
      list: twoItems,
      input: { x: 20, y: 'bar' }
    });

    testErrorObject({
      name: '1 right value, 1 wrong value',
      list: twoItems,
      input: { x: [5, 6], y: 'hello' }
    });

    testErrorObject({
      name: 'All wrong values',
      list: twoItems,
      input: { x: false, y: 24 }
    });
  });

  describe('2 levels', () => {
    testValidObject({
      name: 'All right values',
      list: twoLevels,
      input: { x: { x1: 'bar', x2: ['foo', 'bar'] } }
    });

    testErrorObject({
      name: '1 right value, 1 wrong value',
      list: twoLevels,
      input: { x: { x1: [1, 2], x2: [4, 5] } }
    });

    testErrorObject({
      name: 'All wrong values',
      list: twoLevels,
      input: { x: { x1: true, x2: 'foo' } }
    });
  });

  describe('2 levels with default', () => {
    testValidObject({
      name: 'All right values',
      list: twoLevelsDefault,
      input: { x: { x1: 25, x2: 400 } }
    });

    testErrorObject({
      name: '1 right value, 1 wrong value',
      list: twoLevelsDefault,
      input: { x: { x1: 'foo', x2: 47 } }
    });

    testErrorObject({
      name: 'All wrong values',
      list: twoLevelsDefault,
      input: { x: { x1: [1, 2], x2: 'foo' } }
    });
  });
});
