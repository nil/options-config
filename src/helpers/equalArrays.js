/**
 * Check if two arrays are equal.
 *
 * @param {array} arr1 - The first array.
 * @param {array} arr2 - The second array.
 */
export default function (arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (const i of arr1) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}
