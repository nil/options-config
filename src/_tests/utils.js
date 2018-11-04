import ClassOption from '../index';
import equalArrays from '../helpers/equalArrays';
import getType from '../helpers/getType';
import inRange from '../helpers/inRange';
import isValid from '../helpers/isValid';

const options = new ClassOption();


export function simpleValidation(name, defaults, input, output = input) {
  test(name, () => {
    expect(options.validate(input, defaults)).toEqual(output);
  });
}

export function typeTest(input, output) {
  test((output.charAt(0).toUpperCase() + output.slice(1)), () => {
    expect(getType(input)).toBe(output);
  });
}

export function arrayTest(num, arr1, arr2, output) {
  test(`Array test ${num}`, () => {
    expect(equalArrays(arr1, arr2)).toBe(output);
  });
}

export function validTest(num, input, list, output) {
  test(`Valid test ${num}`, () => {
    expect(isValid(input, list)).toBe(output);
  });
}

export function rangeTest(num, input, object, output) {
  test(`Range test ${num}`, () => {
    expect(inRange(input, object.min, object.max, object.step)).toBe(output);
  });
}
