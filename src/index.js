/*!
 * options-config v1.1.1
 * by Nil Vila
 */

import getType from './helpers/getType';
import inRange from './helpers/inRange';
import isValid from './helpers/isValid';


/**
 * Check if a value fits the restrictions.
 *
 * @param {string} key    - Option's name.
 * @param {object} valObj - Option's value given by the user.
 * @param {object} list   - Option's restrictions.
 *
 * @returns A value, whether it is the default or the given by the user.
 */
function validateValue(key, valObj, list) {
  const object = list[key];
  const val = valObj[key];
  const type = object.type;
  const valid = object.valid;
  const range = object.range;
  const defaultValue = object.default;
  const warningMessage = `'${key}' now has its default value ('${defaultValue}').`;

  // Return default value if the option is not declared
  if (!val && val !== false && val !== 0) {
    return defaultValue;
  }

  // Return given value if it's a valid value, or default value if it isn't valid
  if (valid) {
    if (isValid(val, valid, type)) {
      return val;
    }

    console.error(`'${val}' is not a valid value for '${key}'.`);
    console.warn(warningMessage);

    return defaultValue;
  }

  // Return default value if the given value isn't a valid type
  if (type && !type.includes(getType(val))) {
    const typeList = getType(type) === 'array' ? `${type.slice(0, -1).join(', ')} or ${type.slice(-1)}` : type;

    console.error(`Data type for '${key}' should be ${typeList}, but not ${getType(val)}.`);
    console.warn(warningMessage);

    return defaultValue;
  }

  // Return default value if the given number is not inside the range
  if (range && !inRange(val, range.min, range.max, range.step)) {
    // console.error(`${val} is not a valid number for '${key}'.`);
    // console.warn(warningMessage);

    return defaultValue;
  }

  return val;
}


export default class {
  constructor(obj) {
    this.defaults = obj;
  }

  validate(obj, defaults = this.defaults) {
    const optionsObj = {};

    for (const key in defaults) {
      if (Object.prototype.hasOwnProperty.call(defaults, key)) {
        let list = defaults[key];
        let type; let valid;

        if ((!list.default && list.default !== false && list.default !== 0) || getType(list.default) === 'object') {
          optionsObj[key] = {};

          if (list.default) {
            type = list.type;
            valid = list.valid;
            list = list.default;
          }

          for (const name in list) {
            if (Object.prototype.hasOwnProperty.call(list, name)) {
              list[name].type = list[name].type || type;
              list[name].valid = list[name].valid || valid;

              optionsObj[key][name] = validateValue(name, obj[key], list);
            }
          }
        } else {
          optionsObj[key] = validateValue(key, obj, defaults);
        }
      }
    }

    return optionsObj;
  }
}
