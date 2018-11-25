import customError from 'custom-error';

/**
 * Stops executing the code and prints an error.
 *
 * @param {string} message - The error explanation.
 */
export default function (message) {
  const OptionsConfigError = customError('options-config');

  throw OptionsConfigError(message);
}
