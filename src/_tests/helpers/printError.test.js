import PrintError from '../../helpers/printError';

const undefinedError = new PrintError();
const emptyError = new PrintError('');
const stringError = new PrintError('foo bar');

describe('PrintError', () => {
  describe('Message', () => {
    test('String', () => {
      expect(stringError.message).toBe('foo bar');
    });
    test('Empty', () => {
      expect(emptyError.message).toBe('');
    });
    test('Undefined', () => {
      expect(undefinedError.message).toBeUndefined();
    });
  });

  test('Type', () => {
    expect(typeof stringError).toBe('object');
  });

  test('Name', () => {
    expect(stringError.name).toBe('options-config');
  });
});
