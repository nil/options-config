import isValid from '../helpers/isValid';
import getType from '../helpers/getType';
import PrintError from '../helpers/printError';

/**
 * Checks if `value` meets the `valid` requirements when `valid` is defined.
 *
 * @param {object} key   - The name of the option.
 * @param {*}      value - The value to check.
 * @param {*}      valid - The array, object or value the check is based on.
 * @param {string} type  - The data type of `value`.
 *
 * @returns {boolean} Returns `true` if `value` is in `valid`, else throws error.
 */
export default function (key, value, valid, type) {
  if (valid) {
    if (isValid(value, valid, type)) {
      return true;
    }

    const validList = getType(valid) === 'array' && valid.length > 1 ? `${valid.slice(0, -1).join(', ')} or ${valid.slice(-1)}` : `${valid}`;

    throw new PrintError(`'${value}' doesn't match any of the valid values for '${key}' (${validList}).`);
  }

  return false;
}
