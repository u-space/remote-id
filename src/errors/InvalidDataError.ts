export class InvalidDataError extends Error {
  constructor(message: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, InvalidDataError.prototype);
  }
}
