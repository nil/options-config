import simpleTest from './_utils';

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
      default: true,
      type: 'boolean'
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
    simpleTest('Right type',
      oneItem,
      { x: false });

    simpleTest('Wrong type',
      oneItem,
      { x: 'bar' },
      { x: true });
  });

  describe('2 items', () => {
    simpleTest('All right types',
      twoItems,
      { x: 20, y: 'bar' });

    simpleTest('1 right type, 1 wrong type',
      twoItems,
      { x: 55, y: [1, 2] },
      { x: 55, y: 'foo' });

    simpleTest('All wrong types',
      twoItems,
      { x: false, y: 24 },
      { x: 15, y: 'foo' });
  });

  describe('2 levels', () => {
    simpleTest('All right types',
      twoLevels,
      { x: { x1: 'bar', x2: false } });

    simpleTest('1 right type, 1 wrong type',
      twoLevels,
      { x: { x1: [1, 2], x2: false } },
      { x: { x1: 'foo', x2: false } });

    simpleTest('All wrong types',
      twoLevels,
      { x: { x1: true, x2: 'foo' } },
      { x: { x1: 'foo', x2: true } });
  });

  describe('2 levels with default', () => {
    simpleTest('All right types',
      twoLevelsDefault,
      { x: { x1: 25, x2: 400 } });

    simpleTest('1 right type, 1 wrong type',
      twoLevelsDefault,
      { x: { x1: 'foo', x2: 47 } },
      { x: { x1: 100, x2: 47 } });

    simpleTest('All wrong types',
      twoLevelsDefault,
      { x: { x1: [1, 2], x2: 'foo' } },
      { x: { x1: 100, x2: 200 } });
  });
});
