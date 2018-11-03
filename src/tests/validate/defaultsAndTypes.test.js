import { simpleValidation } from '../utils';

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

describe('Defaults and type', () => {
  describe('1 item', () => {
    simpleValidation('Right type',
      oneItem,
      { x: false });

    simpleValidation('Wrong type',
      oneItem,
      { x: 'bar' },
      { x: true });
  });

  describe('2 items', () => {
    simpleValidation('All right types',
      twoItems,
      { x: 20, y: 'bar' });

    simpleValidation('1 right type, 1 wrong type',
      twoItems,
      { x: [5, 6], y: 'hello' },
      { x: 15, y: 'hello' });

    simpleValidation('All wrong types',
      twoItems,
      { x: false, y: 24 },
      { x: 15, y: 'foo' });
  });

  describe('2 levels', () => {
    simpleValidation('All right types',
      twoLevels,
      { x: { x1: 'bar', x2: ['foo', 'bar'] } });

    simpleValidation('1 right type, 1 wrong type',
      twoLevels,
      { x: { x1: [1, 2], x2: [4, 5] } },
      { x: { x1: 'foo', x2: [4, 5] } });

    simpleValidation('All wrong types',
      twoLevels,
      { x: { x1: true, x2: 'foo' } },
      { x: { x1: 'foo', x2: [1, 2] } });
  });

  describe('2 levels with default', () => {
    simpleValidation('All right types',
      twoLevelsDefault,
      { x: { x1: 25, x2: 400 } });

    simpleValidation('1 right type, 1 wrong type',
      twoLevelsDefault,
      { x: { x1: 'foo', x2: 47 } },
      { x: { x1: 100, x2: 47 } });

    simpleValidation('All wrong types',
      twoLevelsDefault,
      { x: { x1: [1, 2], x2: 'foo' } },
      { x: { x1: 100, x2: 200 } });
  });
});
