import getType from './getType';
import PrintError from './printError';


/**
 * Checks if `value` meets the `regex` requirements when `regex` is defined.
 *
 * @param {object} key   - The name of the option.
 * @param {*}      value - The value to check.
 * @param {regex}  regex - The expression the check is based on.
 *
 * @returns {boolean} Returns `true` if `regex` is defined and `value` matches it, else `false`.
 *
 * @throws {Error} Throws error when `regex` is defined and `value` doesn't match it.
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
