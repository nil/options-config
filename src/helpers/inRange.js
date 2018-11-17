/**
 * Check if a number is inside a range.
 *
 * @param {number} num  - The value to be checked.
 * @param {number} min  - Range's minimum value.
 * @param {number} max  - Range's maximum value.
 * @param {number} step - Distance between two valid values.
 */

export default function (num, min, max, step) {
  if (
    min > num
    || max < num
    || (step && !Number.isInteger(((min || 0) - num) / step))
  ) {
    return false;
  }

  return true;
}
