import equalArrays from './equalArrays';
import getType from './getType';

/**
 * Check if a value is insde a list
 *
 * @param val  - Any value.
 * @param list - A list of all the valid values.
 */
export default function (val, list) {
  if (getType(val) === 'array') {
    for (let i = 0; i < list.length; i += 1) {
      if (equalArrays(list[i], val)) {
        return true;
      }
    }
    return false;
  }

  if (getType(list) === 'object') {
    const listByType = list[getType(val)];

    if (listByType === undefined) {
      return false;
    }

    if (listByType.length === 1 || getType(listByType) === 'string' || listByType.length === undefined) {
      return listByType === 'all' ? true : listByType === val;
    }

    return listByType.includes(val);
  }

  return list.includes(val);
}
