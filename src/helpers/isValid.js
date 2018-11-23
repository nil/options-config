import isEqual from 'lodash.isequal';
import includes from 'lodash.includes';
import getType from './getType';

/**
 * Checks if `value` is included in `collection`.
 *
 * @param {*} value      - The value to check.
 * @param {*} collection - The array, object or value to check from.
 *
 * @returns {boolean} - Returns `true` if `value` is in `collection`, else `false`.
 */
export default function (value, collection) {
  const list = collection[getType(value)] || collection;

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

  return false;
}
