/*!
 * options-config v1.0.0
 * by Nil Vila
 */

export function validateChosenValue(key, valObj, list) {
  const object = list[key];
  const val = valObj[key];
  const type = object.type;
  const accepted = object.values;
  const defaultValue = object.default;

  // Return default value if the option is not declared
  if (!val && val !== false && val !== 0) {
    return defaultValue;
  }

  // Return default value if the declared option is not a valid type
  if (type && !type.includes(typeof val)) {
    console.error('type not correct');
    return defaultValue;
  }

  // Return default value if hte declared option is not an accepted value
  if (accepted && !accepted.includes(val)) {
    console.error('value not accepted');
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

        if ((!list.default && list.default !== false && list.default !== 0) || typeof list.default === 'object') {
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
