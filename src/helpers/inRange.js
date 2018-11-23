import isNumber from 'lodash.isnumber';
import PrintError from './printError';


/**
 * Checks if `value` meets the `range` requirements when `range` is defined.
 *
 * @param {object} key   - The name of the option.
 * @param {*}      value - The value to check.
 * @param {object} range - The range the check is based on.
 *
 * @returns {boolean} Returns `false` if `value` is in range.
 *
 * @throws {Error} Throws error if `range` is defined and `value` is not in range.
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

    if (
      min > value
      || max < value
      || (step && !Number.isInteger(((min || 0) - value) / step))
    ) {
      throw new PrintError(`${value} doesn't fit the range specified for '${key}'.`);
    }
  }

  return false;
}
