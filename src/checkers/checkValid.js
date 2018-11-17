import isValid from '../helpers/isValid';
import getType from '../helpers/getType';
import PrintError from '../helpers/printError';

export default function (key, val, valid, type) {
  if (valid) {
    if (isValid(val, valid, type)) {
      return val;
    }

    const validList = getType(valid) === 'array' && valid.length > 1 ? `${valid.slice(0, -1).join(', ')} or ${valid.slice(-1)}` : `${valid}`;

    throw new PrintError(`'${val}' doesn't match any of the valid values for '${key}' (${validList}).`);
  }

  return false;
}
