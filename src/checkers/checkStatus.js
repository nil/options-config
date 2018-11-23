/**
 * Checks if `value` is defined.
 *
 * @param {*} value - The value to check.
 *
 * @returns {boolean} Returns `true` if `value` is not defined, else `false`.
 */
export default function (value) {
  if (value === 'value_not_defined') {
    return true;
  }

  return false;
}
