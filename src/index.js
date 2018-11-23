import getType from './helpers/getType';
import hasKey from './helpers/hasKey';
import inRange from './helpers/inRange';
import isDeclared from './helpers/isDeclared';
import isMatch from './helpers/isMatch';
import isType from './helpers/isType';
import isValid from './helpers/isValid';


/**
 * Checks if a value fits the restrictions.
 *
 * @param {string} key    - The name of the option
 * @param {object} valObj - The value to check.
 * @param {object} list   - The replacement restrictions.
 *
 * @returns A value, whether it is the default or the given by the user.
 */
function validateValue(key, valObj, list) {
  let type; let valid; let range; let regex;

  const object = list[key];
  const val = hasKey(valObj, key) ? valObj[key] : 'value_not_defined';
  let defaultValue = object;

  if (object) {
    type = object.type;
    valid = object.valid;
    range = object.range;
    regex = object.regex;

    defaultValue = hasKey(object, 'default') ? object.default : object;
  }

  if (isDeclared(val)) {
    return defaultValue;
  }

  if (isMatch(key, val, regex)) {
    return val;
  }

  if (isValid(key, val, valid, type)) {
    return val;
  }

  isType(key, val, type);

  inRange(key, val, range);

  return val;
}


export default class {
  constructor(obj) {
    this.defaults = obj;
  }

  validate(obj, defaults = this.defaults) {
    const optionsObj = {};

    for (const key in defaults) {
      if (hasKey(defaults, key)) {
        let list = defaults[key];
        let type; let valid; let range; let regex;

        if (
          getType(list) === 'object'
          && (!hasKey(list, 'default') || getType(list.default) === 'object')
        ) {
          optionsObj[key] = {};

          if (list.default) {
            type = list.type;
            valid = list.valid;
            range = list.range;
            regex = list.regex;
            list = list.default;
          }

          for (const name in list) {
            if (hasKey(list, name)) {
              if (getType(list[name]) === 'object') {
                list[name].type = list[name].type || type;
                list[name].valid = list[name].valid || valid;
                list[name].range = list[name].range || range;
                list[name].regex = list[name].regex || regex;
              }

              const userOptions = obj[key] || {};

              optionsObj[key][name] = validateValue(name, userOptions, list);
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
