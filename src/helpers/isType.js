import getType from './getType';
import printError from './printError';


/**
 * Checks if `value` meets the `type` requirements when `type` is defined.
 *
 * @param {object} key   - The name of the option.
 * @param {*}      value - The value to check.
 * @param {string} type  - The data type of `value`.
 *
 * @returns {boolean} Returns `false` if `type` is not defined or `value` is data type `type`.
 *
 * @throws {Error} Throws error when `type` is defined and is not the data type of `value`.
 */
export default function (key, value, type) {
  const valType = getType(value);

  if (type && !type.includes(valType)) {
    const typeList = getType(type) === 'array' && type.length > 1 ? `${type.slice(0, -1).join(', ')} or ${type.slice(-1)}` : `${type}`;

    printError(`'${value}', ${valType}, is not a valid data type for '${key}' (${typeList}).`);
  }

  return false;
}
