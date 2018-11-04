import { arrayTest } from '../utils';

/*
 * arrayTest([test id],
 *   [array 1],
 *   [array 2],
 *   [expected output]);
 */

describe('equalArrays', () => {
  arrayTest(1,
    [1, 2, 3],
    [1, 2, 3],
    true);

  arrayTest(2,
    [1, 2, 3],
    [4, 5, 6],
    false);

  arrayTest(3,
    [1, 2, 3],
    [1, '2', '3'],
    false);

  arrayTest(4,
    [1, 2, 3],
    [1],
    false);

  arrayTest(5,
    [1],
    [1, 2, 3],
    false);

  arrayTest(6,
    ['a', 'b', 'c'],
    ['c', 'b', 'a'],
    true);

  arrayTest(7,
    ['foo', 1, { x: true }],
    ['foo', 1, { x: true }],
    true);
});
