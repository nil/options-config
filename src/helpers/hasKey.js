/**
 * Checks if `key` is declared in `object`.
 *
 * @param {object} object - The object to check from.
 * @param {string} key    - The key to check.
 *
 * @returns {boolean} Returns `true` if `key` is in `object`, else `false`.
 */
export default function (object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}
