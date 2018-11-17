import isNumber from 'lodash.isnumber';
import inRange from '../helpers/inRange';
import PrintError from '../helpers/printError';

export default function (key, val, range) {
  if (range) {
    const min = range.min;
    const max = range.max;
    const step = range.step;

    if (
      (!isNumber(min) && min !== undefined)
      || (!isNumber(max) && max !== undefined)
      || (!isNumber(step) && step !== undefined)
    ) {
      throw new PrintError(`Range is not properly configured for '${key}'.`);
    }

    if (!inRange(val, min, max, step)) {
      throw new PrintError(`${val} doesn't fit the range specified for '${key}'.`);
    }
  }

  return undefined;
}
