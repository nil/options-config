import getType from './helpers/getType';
import checkMatch from './checkers/checkMatch';
import checkRange from './checkers/checkRange';
import checkStatus from './checkers/checkStatus';
import checkType from './checkers/checkType';
import checkValid from './checkers/checkValid';


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
  const match = object.match;
  const defaultValue = object.default;

  if (checkStatus(val)) {
    return defaultValue;
  }

  if (checkMatch(key, val, match)) {
    return val;
  }

  if (checkValid(key, val, valid, type)) {
    return val;
  }

  checkType(key, val, type);

  checkRange(key, val, range);

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
        let type; let valid; let range; let match;

        if (!Object.prototype.hasOwnProperty.call(list, 'default') || getType(list.default) === 'object') {
          optionsObj[key] = {};

          if (list.default) {
            type = list.type;
            valid = list.valid;
            range = list.range;
            match = list.match;
            list = list.default;
          }

          for (const name in list) {
            if (Object.prototype.hasOwnProperty.call(list, name)) {
              list[name].type = list[name].type || type;
              list[name].valid = list[name].valid || valid;
              list[name].range = list[name].range || range;
              list[name].match = list[name].match || match;

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
