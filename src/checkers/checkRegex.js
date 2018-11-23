import getType from '../helpers/getType';
import PrintError from '../helpers/printError';

export default function (key, val, regex) {
  if (regex) {
    if (getType(val) === 'string' && val.match(regex) && val.match(regex)[0] === val) {
      return true;
    }

    throw new PrintError(`'${val}' doesn't match the Regex expression ${regex} for '${key}'.`);
  }

  return false;
}
