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
    type: ['number', 'boolean'],
    range: {
      min: 0,
      max: 20
    }
  }
};

const twoLevels = {
  x: {
    x1: {
      default: 20.5,
      range: {
        min: 20,
        max: 30,
        step: 0.5
      }
    },
    x2: {
      default: 40,
      type: 'number',
      range: {
        step: 10
      }
    }
  }
};

const twoLevelsDefault = {
  x: {
    default: {
      x1: {
        default: -12.4,
        range: {
          min: -20,
          max: 0,
          step: 0.2
        }
      },
      x2: {
        default: 200,
        range: {
          min: 0,
          max: 400,
          step: 50
        },
        valid: [220, 320, 'foo', 'bar']
      }
    },
    type: 'number'
  }
};


/*
 * Tests
 */

describe('Range', () => {
  describe('1 item', () => {
    testValidObject({
      name: 'Valid number',
      list: oneItem,
      input: { x: 5 }
    });

    testErrorObject({
      name: 'Invalid number',
      list: oneItem,
      input: { x: 37 }
    });

    testValidObject({
      name: 'Different type',
      list: oneItem,
      input: { x: false }
    });
  });

  describe('2 levels', () => {
    testValidObject({
      name: 'Valid numbers',
      list: twoLevels,
      input: { x: { x1: 20, x2: 93479230 } }
    });

    testErrorObject({
      name: 'Invalid numbers',
      list: twoLevels,
      input: { x: { x1: 30.5, x2: '50' } }
    });
  });

  describe('2 levels with default', () => {
    testValidObject({
      name: 'Valid numbers',
      list: twoLevelsDefault,
      input: { x: { x1: -15.6, x2: 220 } }
    });

    testErrorObject({
      name: 'Invalid numbers',
      list: twoLevelsDefault,
      input: { x: { x1: 10, x2: 40 } }
    });

    testErrorObject({
      name: 'Not numbers',
      list: twoLevelsDefault,
      input: { x: { x1: '-10', x2: 'foo' } }
    });
  });
});
