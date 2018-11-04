import isEqual from 'lodash.isequal';
import includes from 'lodash.includes';
import getType from './getType';

/**
 * Check if a value is insde a list
 *
 * @param val  - Any value.
 * @param list - A list of all the valid values.
 */
export default function (val, list) {
  const inventory = list[getType(val)] || list;

  if (
    inventory === val
    || includes(inventory, val)
    || inventory === 'all'
  ) {
    return true;
  }

  for (let i = 0; i < inventory.length; i += 1) {
    if (isEqual(inventory[i], val)) {
      return true;
    }
  }

  return false;
}
