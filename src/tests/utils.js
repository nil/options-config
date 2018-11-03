import ClassOption, { getType, areArraysEqual } from '../index';

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
    expect(areArraysEqual(arr1, arr2)).toBe(output);
  });
}
