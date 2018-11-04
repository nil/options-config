import { validTest } from '../utils';

/*
 * validTest([test id],
 *   [input],
 *   [list],
 *   [expected output]);
 */

const string = ['foo', 'bar', 'hello', 'world'];
const stringNumber = ['foo', 'bar', 10, 20];
const numberBoolean = [45, 50, true, false];

describe('checkIfValueAccepted', () => {
  validTest(1,
    'foo',
    string,
    true);

  validTest(2,
    'hey',
    string,
    false);

  validTest(3,
    'foo',
    stringNumber,
    true);

  validTest(4,
    10,
    stringNumber,
    true);

  validTest(5,
    '20',
    stringNumber,
    false);

  validTest(6,
    45,
    numberBoolean,
    true);

  validTest(7,
    false,
    numberBoolean,
    true);
});
