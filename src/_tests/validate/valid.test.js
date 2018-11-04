import { simpleValidation } from '../utils';

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

describe('Valid', () => {
  describe('1 item', () => {
    simpleValidation('Right values',
      oneItem,
      { x: 20 });

    simpleValidation('Wrong values',
      oneItem,
      { x: 30 },
      { x: 15 });
  });

  describe('2 items', () => {
    simpleValidation('All right values',
      twoItems,
      { x: [3, 4], y: 100 });

    simpleValidation('1 right value, 1 wrong value',
      twoItems,
      { x: [12, 13, 14], y: 'bar' },
      { x: [1, 2], y: 'bar' });

    simpleValidation('All wrong values',
      twoItems,
      { x: [15], y: false },
      { x: [1, 2], y: 'foo' });
  });

  describe('2 levels', () => {
    simpleValidation('All right values',
      twoLevels,
      { x: { x1: true, x2: 10 } });

    simpleValidation('1 right value, 1 wrong value',
      twoLevels,
      { x: { x1: 'string', x2: false } },
      { x: { x1: 'foo', x2: false } });

    simpleValidation('All wrong values',
      twoLevels,
      { x: { x1: 30, x2: 'foo' } },
      { x: { x1: 'foo', x2: 25 } });
  });

  describe('2 levels with default', () => {
    simpleValidation('All right values',
      twoLevelsDefault,
      { x: { x1: 150, x2: 400 } });

    simpleValidation('1 right value, 1 wrong value',
      twoLevelsDefault,
      { x: { x1: 50, x2: 250 } },
      { x: { x1: 50, x2: 200 } });

    simpleValidation('All wrong values',
      twoLevelsDefault,
      { x: { x1: 25, x2: 40 } },
      { x: { x1: 100, x2: 200 } });
  });
});
