import {
  testValidObject,
  testErrorObject
} from '../utils';


/*
 * Default objects
 */

const oneItem = {
  x: {
    default: false,
    type: 'boolean'
  }
};

const twoItems = {
  x: {
    default: 'foo',
    type: 'string',
    valid: ['foo', 'bar', 'hello', 'world']
  },
  y: {
    default: 30,
    range: {
      min: 10,
      max: 100
    }
  }
};

const twoLevels = {
  x: {
    x1: {
      default: '123',
      type: ['number', 'string'],
      regex: /\d{3}/
    },
    x2: {
      default: false,
      valid: {
        boolean: 'all',
        string: ['foo', 'bar'],
        number: [100, 200]
      }
    }
  }
};

const twoLevelsDefault = {
  x: {
    default: {
      x1: {
        default: 2.5
      },
      x2: {
        default: -0.2
      }
    },
    type: 'number',
    range: {
      step: 0.1
    }
  }
};


/*
 * Tests
 */

describe('Structure', () => {
  describe('1 item', () => {
    testValidObject({
      name: '1 declaration',
      list: oneItem,
      input: { x: true }
    });
  });

  describe('2 items', () => {
    testValidObject({
      name: '1 valid declaration',
      list: twoItems,
      input: { x: 'hello' },
      output: { x: 'hello', y: 30 }
    });

    testValidObject({
      name: '2 valid declarations',
      list: twoItems,
      input: { x: 'bar', y: 14 }
    });

    testErrorObject({
      name: '1 valid declarations, 1 wrong declaration',
      list: twoItems,
      input: { x: 'hey', y: 65 }
    });

    testErrorObject({
      name: '2 wrong declarations',
      list: twoItems,
      input: { x: 40, y: false }
    });
  });

  describe('2 levels', () => {
    testValidObject({
      name: '1 valid declaration',
      list: twoLevels,
      input: { x: { x2: 100 } },
      output: { x: { x1: '123', x2: 100 } }
    });

    testValidObject({
      name: '2 valid declarations',
      list: twoLevels,
      input: { x: { x1: '942', x2: false } }
    });

    testErrorObject({
      name: '1 valid declarations, 1 wrong declaration',
      list: twoLevels,
      input: { x: { x1: 123, x2: 'hey' } }
    });

    testErrorObject({
      name: '2 wrong declarations',
      list: twoLevels,
      input: { x: { x1: false, x2: 25 } }
    });
  });

  describe('2 levels with default', () => {
    testValidObject({
      name: '1 valid declaration',
      list: twoLevelsDefault,
      input: { x: { x1: 0 } },
      output: { x: { x1: 0, x2: -0.2 } }
    });

    testValidObject({
      name: '2 valid declarations',
      list: twoLevelsDefault,
      input: { x: { x1: 100, x2: 0.5 } }
    });

    testErrorObject({
      name: '1 valid declarations, 1 wrong declaration',
      list: twoLevelsDefault,
      input: { x: { x1: 12.24, x2: -3.2 } }
    });

    testErrorObject({
      name: '2 wrong declarations',
      list: twoLevelsDefault,
      input: { x: { x1: 12.54, x2: 3.14159 } }
    });
  });
});
