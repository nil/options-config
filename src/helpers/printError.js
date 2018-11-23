/**
 * Stops executing the code and prints an error.
 *
 * @param {string} message - The error explanation.
 */
class PrintError {
  constructor(message) {
    this.name = 'options-config';
    this.message = message;

    this.stack = (new Error()).stack;
  }
}

PrintError.prototype = new Error();

export default PrintError;
