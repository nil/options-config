import { simpleValidation } from '../utils';

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

describe('Range', () => {
  describe('1 item', () => {
    simpleValidation('Valid number',
      oneItem,
      { x: 5 });

    simpleValidation('Invalid number',
      oneItem,
      { x: 37 },
      { x: 15 });

    simpleValidation('Different type',
      oneItem,
      { x: false });
  });

  describe('2 levels', () => {
    simpleValidation('Valid numbers',
      twoLevels,
      { x: { x1: 20, x2: 93479230 } });

    simpleValidation('Invalid numbers',
      twoLevels,
      { x: { x1: 30.5, x2: '50' } },
      { x: { x1: 20.5, x2: 40 } });
  });

  describe('2 levels with default', () => {
    simpleValidation('Valid numbers',
      twoLevelsDefault,
      { x: { x1: -15.6, x2: 220 } });

    simpleValidation('Invalid numbers',
      twoLevelsDefault,
      { x: { x1: 10, x2: 40 } },
      { x: { x1: -12.4, x2: 200 } });

    simpleValidation('Not numbers',
      twoLevelsDefault,
      { x: { x1: '-10', x2: 'foo' } },
      { x: { x1: -12.4, x2: 'foo' } });
  });
});
