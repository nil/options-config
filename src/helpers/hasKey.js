/**
 * Check if an object has a key.
 *
 * @param {object} object - An object.
 * @param {string} key    - The key to be checked.
 *
 * @returns {string} Whether the object has the key or not.
 */

export default function (object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}
