import ClassOption from '../index';

const options = new ClassOption();


export default function (name, defaults, input, output = input) {
  test(name, () => {
    expect(options.validate(input, defaults)).toEqual(output);
  });
}
