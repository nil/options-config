import getType from '../helpers/getType';
import PrintError from '../helpers/printError';

/**
 * Checks if `value` meets the `regex` requirements when `regex` is defined.
 *
 * @param {object} key   - The name of the option.
 * @param {*}      value - The value to check.
 * @param {regex}  regex - The expression the check is based on.
 *
 * @returns {boolean} Returns `true` if `value` matches `regex`, else throws error.
 */
export default function (key, value, regex) {
  if (regex) {
    if (getType(value) === 'string' && value.match(regex) && value.match(regex)[0] === value) {
      return true;
    }

    throw new PrintError(`'${value}' doesn't match the Regex expression ${regex} for '${key}'.`);
  }

  return false;
}
