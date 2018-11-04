import { validTest } from '../utils';

/*
 * validTest([test id],
 *   [input],
 *   [list],
 *   [expected output]);
 */

const itemString = 'foo';
const itemNumber = 22;
const itemBoolean = true;

const arrayString = ['foo', 'bar', 'hello', 'world'];
const arrayTwoTypes = ['foo', 'bar', 10, 20];
const arrayThreeTypes = [45, 50, true, false, ['foo', 'bar']];

const objectOneType = { number: [14, 15, 16] };
const objectTwoTypes = { string: 'all', array: [[1, 2], [2, 3]] };

describe('isValid', () => {
  describe('Single valid item', () => {
    validTest(1,
      'foo',
      itemString,
      true);

    validTest(2,
      'bar',
      itemString,
      false);

    validTest(3,
      false,
      itemString,
      false);

    validTest(4,
      40,
      itemNumber,
      false);

    validTest(5,
      'foo',
      itemNumber,
      false);

    validTest(6,
      true,
      itemBoolean,
      true);

    validTest(7,
      [1, 2],
      itemBoolean,
      false);
  });

  describe('Array of items', () => {
    validTest(1,
      'foo',
      arrayString,
      true);

    validTest(2,
      'hey',
      arrayString,
      false);

    validTest(3,
      'foo',
      arrayTwoTypes,
      true);

    validTest(4,
      10,
      arrayTwoTypes,
      true);

    validTest(5,
      '20',
      arrayTwoTypes,
      false);

    validTest(6,
      false,
      arrayTwoTypes,
      false);

    validTest(7,
      45,
      arrayThreeTypes,
      true);

    validTest(8,
      false,
      arrayThreeTypes,
      true);

    validTest(9,
      'foo',
      arrayThreeTypes,
      false);

    validTest(10,
      ['foo', 'bar'],
      arrayThreeTypes,
      true);

    validTest(11,
      ['bar', 'foo'],
      arrayThreeTypes,
      false);
  });

  describe('Object of items', () => {
    validTest(1,
      15,
      objectOneType,
      true);

    validTest(2,
      10,
      objectOneType,
      false);

    validTest(3,
      'foo',
      objectOneType,
      false);

    validTest(4,
      [14, 15, 16],
      objectOneType,
      false);

    validTest(5,
      'all',
      objectTwoTypes,
      true);

    validTest(6,
      'foo',
      objectTwoTypes,
      true);

    validTest(7,
      [1, 2],
      objectTwoTypes,
      true);

    validTest(8,
      1,
      objectTwoTypes,
      false);

    validTest(9,
      [3, 4],
      objectTwoTypes,
      false);
  });
});
