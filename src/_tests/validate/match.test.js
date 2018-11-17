import {
  testValidObject,
  testErrorObject
} from '../utils';


/*
 * Default objects
 */

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


/*
 * Tests
 */

describe('Match', () => {
  describe('1 item', () => {
    testValidObject({
      name: '1st valid value',
      list: oneItem,
      input: { x: '4four' }
    });

    testValidObject({
      name: '2nd valid value',
      list: oneItem,
      input: { x: '2dish' }
    });

    testErrorObject({
      name: 'Wrong value',
      list: oneItem,
      input: { x: 'test4' }
    });

    testErrorObject({
      name: 'Invalid type',
      list: oneItem,
      input: { x: 34 }
    });
  });

  describe('2 items', () => {
    testValidObject({
      name: '1st valid values',
      list: twoItems,
      input: { x: '912-340', y: 'FEDCAE' }
    });

    testValidObject({
      name: '2nd valid values',
      list: twoItems,
      input: { x: '854-492', y: 'BEF' }
    });

    testErrorObject({
      name: '1st wrong values',
      list: twoItems,
      input: { x: false, y: 'AEGC' }
    });

    testErrorObject({
      name: '2nd wrong values',
      list: twoItems,
      input: { x: '930212', y: 'cabb' }
    });
  });

  describe('2 levels', () => {
    testValidObject({
      name: '1st valid values',
      list: twoLevels,
      input: { x: { x1: '!/(' } }
    });

    testValidObject({
      name: '2nd valid values',
      list: twoLevels,
      input: { x: { x1: 'œ√€øπ' } }
    });

    testErrorObject({
      name: '1st wrong values',
      list: twoLevels,
      input: { x: { x1: 672 } }
    });

    testErrorObject({
      name: '2nd wrong values',
      list: twoLevels,
      input: { x: { x1: 'èeé' } }
    });
  });

  describe('2 levels with default', () => {
    testValidObject({
      name: '1st valid values',
      list: twoLevelsDefault,
      input: { x: { x1: '93.38.123.19', x2: '67.12.34.100' } }
    });

    testValidObject({
      name: '2nd valid values',
      list: twoLevelsDefault,
      input: { x: { x1: '0.0.0.0', x2: '125.110.43.1' } }
    });

    testErrorObject({
      name: '1st wrong values',
      list: twoLevelsDefault,
      input: { x: { x1: '340.130.0.10', x2: '4.5.3.280' } }
    });

    testErrorObject({
      name: '2nd wrong values',
      list: twoLevelsDefault,
      input: { x: { x1: '-12.23.102.390', x2: [0, 0, 122, 120] } }
    });
  });
});
