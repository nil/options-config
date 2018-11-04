/**
 * Get the data type of a given value.
 *
 * @param val - Any value.
 *
 * @returns {string} Input's data type.
 */
export default function (val) {
  return ({}).toString.call(val).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
