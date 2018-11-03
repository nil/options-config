import { simpleValidation } from '../utils';

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

describe('Only defaults', () => {
  describe('1 item', () => {
    simpleValidation('1 declaration',
      oneItem,
      { x: 'bar' });
  });

  describe('2 items', () => {
    simpleValidation('1 declaration',
      twoItems,
      { x: { 1: 'yes' } },
      { x: { 1: 'yes' }, y: 20 });

    simpleValidation('2 declarations',
      twoItems,
      { x: [10, 20], y: 'foo' });
  });

  describe('2 levels', () => {
    simpleValidation('1 declaration',
      twoLevels,
      { x: { x1: true } },
      { x: { x1: true, x2: true } });

    simpleValidation('2 declarations',
      twoLevels,
      { x: { x1: 100, x2: ['foo', 'bar'] } });
  });

  describe('2 levels with default', () => {
    simpleValidation('1 declaration',
      twoLevelsDefault,
      { x: { x1: 15 } },
      { x: { x1: 15, x2: 'foo' } });

    simpleValidation('2 declarations',
      twoLevelsDefault,
      { x: { x1: 244, x2: ['foo', 'bar'] } });
  });
});
