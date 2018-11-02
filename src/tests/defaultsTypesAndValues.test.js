import simpleTest from './_utils';

const oneItem = {
  x: {
    default: 15,
    type: 'number',
    values: [10, 15, 20, 25]
  }
};

const twoItems = {
  x: {
    default: false,
    type: 'boolean',
    values: [false, true]
  },
  y: {
    default: 'foo',
    type: 'string',
    values: ['foo', 'bar', 'hey']
  }
};

const twoLevels = {
  x: {
    x1: {
      default: 'foo',
      type: 'string',
      values: ['foo', 'bar', 'hey']
    },
    x2: {
      default: true,
      type: 'boolean',
      values: [false, true]
    }
  }
};

const twoLevelsDefault = {
  x: {
    default: {
      x1: {
        default: 100,
        values: [50, 100, 150, 200]
      },
      x2: {
        default: 200,
        values: [100, 200, 300, 400]
      }
    },
    type: 'number'
  }
};

describe('Defaults and type', () => {
  describe('1 item', () => {
    simpleTest('Right type',
      oneItem,
      { x: 20 });

    simpleTest('Wrong type',
      oneItem,
      { x: 30 },
      { x: 15 });
  });

  describe('2 items', () => {
    simpleTest('All right types',
      twoItems,
      { x: true, y: 'hey' });

    simpleTest('1 right type, 1 wrong type',
      twoItems,
      { x: 'foo', y: 'bar' },
      { x: false, y: 'bar' });

    simpleTest('All wrong types',
      twoItems,
      { x: 15, y: false },
      { x: false, y: 'foo' });
  });

  describe('2 levels', () => {
    simpleTest('All right types',
      twoLevels,
      { x: { x1: 'bar', x2: false } });

    simpleTest('1 right type, 1 wrong type',
      twoLevels,
      { x: { x1: 'string', x2: false } },
      { x: { x1: 'foo', x2: false } });

    simpleTest('All wrong types',
      twoLevels,
      { x: { x1: 'hey', x2: false } },
      { x: { x1: 'hey', x2: false } });
  });

  describe('2 levels with default', () => {
    simpleTest('All right types',
      twoLevelsDefault,
      { x: { x1: 150, x2: 400 } });

    simpleTest('1 right type, 1 wrong type',
      twoLevelsDefault,
      { x: { x1: 50, x2: 250 } },
      { x: { x1: 50, x2: 200 } });

    simpleTest('All wrong types',
      twoLevelsDefault,
      { x: { x1: 25, x2: 40 } },
      { x: { x1: 100, x2: 200 } });
  });
});
