import getType from '../helpers/getType';
import PrintError from '../helpers/printError';

export default function (key, val, match) {
  if (match) {
    if (getType(val) === 'string' && val.match(match) && val.match(match)[0] === val) {
      return val;
    }

    throw new PrintError(`'${val}' doesn't match the RegExp expression ${match} for '${key}'.`);
  }

  return false;
}
