import isNumber from 'lodash.isnumber';
import inRange from '../helpers/inRange';
import PrintError from '../helpers/printError';

/**
 * Checks if `value` meets the `range` requirements when `range` is defined.
 *
 * @param {object} key   - The name of the option.
 * @param {*}      value - The value to check.
 * @param {object} range - The range the check is based on.
 *
 * @returns {boolean} Returns `false` if `value` is in range, else throws error.
 */
export default function (key, value, range) {
  if (range) {
    const min = range.min;
    const max = range.max;
    const step = range.step;

    if (
      (!isNumber(min) && min !== undefined)
      || (!isNumber(max) && max !== undefined)
      || (!isNumber(step) && step !== undefined)
    ) {
      throw new PrintError(`Range is not properly configured for '${key}'.`);
    }

    if (!inRange(value, min, max, step)) {
      throw new PrintError(`${value} doesn't fit the range specified for '${key}'.`);
    }
  }

  return false;
}
