import { simpleValidation } from '../utils';

const oneItem = {
  x: {
    default: '1fish',
    match: /\d[a-z]+/
  }
};

const twoItems = {
  x: {
    default: '203-186',
    match: /\d{3}-\d{3}/
  },
  y: {
    default: 'ABC',
    match: /[A-F]+/
  }
};

const twoLevels = {
  x: {
    x1: {
      default: '(1)',
      match: /[^A-z]+/
    }
  }
};

const twoLevelsDefault = {
  x: {
    default: {
      x1: {
        default: '0.0.0.0'
      },
      x2: {
        default: '1.2.3.4'
      }
    },
    match: /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/
  }
};

describe('Match', () => {
  describe('One item', () => {
    simpleValidation(1,
      oneItem,
      { x: '4four' });

    simpleValidation(2,
      oneItem,
      { x: '2dish' });

    simpleValidation(3,
      oneItem,
      { x: 'test4' },
      { x: '1fish' });

    simpleValidation(4,
      oneItem,
      { x: 34 },
      { x: '1fish' });
  });

  describe('Two items', () => {
    simpleValidation(1,
      twoItems,
      { x: '912-340', y: 'FEDCAE' });

    simpleValidation(2,
      twoItems,
      { x: '854-492', y: 'BEF' });

    simpleValidation(3,
      twoItems,
      { x: false, y: 'AEGC' },
      { x: '203-186', y: 'ABC' });

    simpleValidation(4,
      twoItems,
      { x: '930212', y: 'cabb' },
      { x: '203-186', y: 'ABC' });
  });

  describe('Two levels', () => {
    simpleValidation(1,
      twoLevels,
      { x: { x1: '!/(' } });

    simpleValidation(2,
      twoLevels,
      { x: { x1: 'œ√€øπ' } });

    simpleValidation(3,
      twoLevels,
      { x: { x1: 672 } },
      { x: { x1: '(1)' } });

    simpleValidation(4,
      twoLevels,
      { x: { x1: 'èeé' } },
      { x: { x1: '(1)' } });
  });

  describe('Two levels with default', () => {
    simpleValidation(1,
      twoLevelsDefault,
      { x: { x1: '93.38.123.19', x2: '67.12.34.100' } });

    simpleValidation(2,
      twoLevelsDefault,
      { x: { x1: '0.0.0.0', x2: '125.110.43.1' } });

    simpleValidation(3,
      twoLevelsDefault,
      { x: { x1: '340.130.0.10', x2: '4.5.3.280' } },
      { x: { x1: '0.0.0.0', x2: '1.2.3.4' } });

    simpleValidation(4,
      twoLevelsDefault,
      { x: { x1: '-12.23.102.390', x2: [0, 0, 122, 120] } },
      { x: { x1: '0.0.0.0', x2: '1.2.3.4' } });
  });
});
