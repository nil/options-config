import getType from '../helpers/getType';
import PrintError from '../helpers/printError';

/**
 * Checks if `value` meets the `type` requirements when `type` is defined.
 *
 * @param {object} key   - The name of the option.
 * @param {*}      value - The value to check.
 * @param {string} type  - The data type of `value`.
 *
 * @returns {boolean} Returns `false` if `value` is data type `type`, else throws error.
 */
export default function (key, value, type) {
  const valType = getType(value);

  if (type && !type.includes(valType)) {
    const typeList = getType(type) === 'array' && type.length > 1 ? `${type.slice(0, -1).join(', ')} or ${type.slice(-1)}` : `${type}`;

    throw new PrintError(`'${value}', ${valType}, is not a valid data type for '${key}' (${typeList}).`);
  }

  return false;
}
