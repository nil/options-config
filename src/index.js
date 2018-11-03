/*!
 * options-config v1.0.2
 * by Nil Vila
 */

export function getType(val) {
  return ({}).toString.call(val).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

export function areArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (const i of arr1) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}
export function checkIfValueAccepted(val, list) {
  if (getType(val) === 'array') {
    for (let i = 0; i < list.length; i += 1) {
      if (areArraysEqual(list[i], val)) {
        return true;
      }
    }
    return false;
  }

  return list.includes(val);
}

export function validateChosenValue(key, valObj, list) {
  const object = list[key];
  const val = valObj[key];
  const type = object.type;
  const accepted = object.values;
  const defaultValue = object.default;
  const warningMessage = `'${key}' now has its default value ('${defaultValue}').`;

  // Return default value if the option is not declared
  if (!val && val !== false && val !== 0) {
    return defaultValue;
  }

  // Return default value if the declared option is not a valid type
  if (type && !type.includes(getType(val))) {
    const typeList = getType(type) === 'array' ? `${type.slice(0, -1).join(', ')} or ${type.slice(-1)}` : type;

    console.error(`Data type for '${key}' should be ${typeList}, but not ${getType(val)}.`);
    console.warn(warningMessage);

    return defaultValue;
  }

  // Return default value if hte declared option is not an accepted value
  if (accepted && !checkIfValueAccepted(val, accepted)) {
    console.error(`'${val}' is not an accepted value for '${key}'.`);
    console.warn(warningMessage);

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
        let type; let accepted;

        if ((!list.default && list.default !== false && list.default !== 0) || getType(list.default) === 'object') {
          optionsObj[key] = {};

          if (list.default) {
            type = list.type;
            accepted = list.values;
            list = list.default;
          }

          for (const name in list) {
            if (Object.prototype.hasOwnProperty.call(list, name)) {
              list[name].type = list[name].type || type;
              list[name].values = list[name].values || accepted;

              optionsObj[key][name] = validateChosenValue(name, obj[key], list);
            }
          }
        } else {
          optionsObj[key] = validateChosenValue(key, obj, defaults);
        }
      }
    }

    return optionsObj;
  }
}
