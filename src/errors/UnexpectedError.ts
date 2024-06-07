export class UnexpectedError extends Error {
  constructor(message: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, UnexpectedError.prototype);
  }
}
