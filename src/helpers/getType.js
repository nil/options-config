/**
 * Checks the data type of `value`.
 *
 * @param {*} value - The value to check.
 *
 * @returns {string} Returns the data type.
 */
export default function (value) {
  return ({}).toString.call(value).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
