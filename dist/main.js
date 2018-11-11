(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('lodash.isequal'), require('lodash.includes')) :
  typeof define === 'function' && define.amd ? define(['lodash.isequal', 'lodash.includes'], factory) :
  (global['options-config'] = factory(global.isEqual,global.includes));
}(this, (function (isEqual,includes) { 'use strict';

  isEqual = isEqual && isEqual.hasOwnProperty('default') ? isEqual['default'] : isEqual;
  includes = includes && includes.hasOwnProperty('default') ? includes['default'] : includes;

  /**
   * Get the data type of a given value.
   *
   * @param val - Any value.
   *
   * @returns {string} Input's data type.
   */
  function getType (val) {
    return ({}).toString.call(val).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  /**
   * Check if a number is inside a range.
   *
   * @param {number} num  - The value to be checked.
   * @param {number} min  - Range's minimum value.
   * @param {number} max  - Range's maximum value.
   * @param {number} step - Distance between two valid values.
   */
  function inRange (num, min, max, step) {
    if (
      min > num
      || max < num
      || (step && !Number.isInteger(((min || 0) - num) / step))
    ) {
      return false;
    }

    return true;
  }

  /**
   * Check if a value is insde a list
   *
   * @param val  - Any value.
   * @param list - A list of all the valid values.
   */
  function isValid (val, list) {
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

  /*!
   * options-config v1.2.0
   * by Nil Vila
   */


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
    const warningMessage = `'${key}' now has its default value ('${defaultValue}').`;

    // Return default value if the option is not declared
    if (!val && val !== false && val !== 0) {
      return defaultValue;
    }

    // Return given value if it matches the regex expression, or the default value if it doesn't
    if (match) {
      if (getType(val) === 'string' && val.match(match) && val.match(match)[0] === val) {
        return val;
      }

      console.error(`'${val}' doesn't match the RegExp expression for '${key}'.`);
      console.warn(warningMessage);

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
      console.error(`${val} is not a valid number for '${key}'.`);
      console.warn(warningMessage);

      return defaultValue;
    }

    return val;
  }


  class index {
    constructor(obj) {
      this.defaults = obj;
    }

    validate(obj, defaults = this.defaults) {
      const optionsObj = {};

      for (const key in defaults) {
        if (Object.prototype.hasOwnProperty.call(defaults, key)) {
          let list = defaults[key];
          let type; let valid; let range; let match;

          if ((!list.default && list.default !== false && list.default !== 0) || getType(list.default) === 'object') {
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

  return index;

})));
