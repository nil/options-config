import ClassOption from '../index';
import getType from '../helpers/getType';

const options = new ClassOption();


export function typeTest(input, output) {
  test((output.charAt(0).toUpperCase() + output.slice(1)), () => {
    expect(getType(input)).toBe(output);
  });
}

export function testValidObject(obj) {
  test(obj.name, () => {
    expect(options.validate(obj.input, obj.list)).toEqual(obj.output || obj.input);
  });
}

export function testErrorObject(obj) {
  test(obj.name, () => {
    expect(() => {
      options.validate(obj.input, obj.list);
    }).toThrowError();
  });
}
