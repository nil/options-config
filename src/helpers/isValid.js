import isEqual from 'lodash.isequal';
import includes from 'lodash.includes';
import getType from './getType';
import printError from './printError';


/**
 * Checks if `value` meets the `valid` requirements when `valid` is defined.
 *
 * @param {object} key   - The name of the option.
 * @param {*}      value - The value to check.
 * @param {*}      valid - The array, object or value the check is based on.
 *
 * @returns {boolean} Returns `true` if `value` is defined and is in `valid`, else returns `false`.
 *
 * @throws {Error} Throws error when `valid` is defined and `value` is not in it.
 */
export default function (key, value, valid) {
  if (valid) {
    const list = valid[getType(value)] || valid;

    if (
      list === value
      || includes(list, value)
      || list === 'all'
    ) {
      return true;
    }

    for (let i = 0; i < list.length; i += 1) {
      if (isEqual(list[i], value)) {
        return true;
      }
    }

    const validList = getType(valid) === 'array' && valid.length > 1 ? `${valid.slice(0, -1).join(', ')} or ${valid.slice(-1)}` : `${valid}`;

    printError(`'${value}' doesn't match any of the valid values for '${key}' (${validList}).`);
  }

  return false;
}
