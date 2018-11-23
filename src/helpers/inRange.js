/**
 * Checks if `number` is, if defined, between `min` and `max`,
 * only counting every n (`step`) numbers.
 *
 * @param {number} num  - The number to check.
 * @param {number} min  - The minimum number of the range.
 * @param {number} max  - The maximum number of the range.
 * @param {number} step - The difference of two valid numbers.
 *
 * @returns {boolean} - Returns `true` if `number` fits in the range, else `false`.
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
