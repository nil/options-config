import inRange from '../helpers/inRange';
import PrintError from '../helpers/printError';

export default function (key, val, range) {
  if (range && !inRange(val, range.min, range.max, range.step)) {
    // TODO: add the range inside the error message

    throw new PrintError(`${val} doesn't fit the range specified for '${key}'.`);
  }

  return undefined;
}
