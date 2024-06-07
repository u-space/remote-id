export class NoDataError extends Error {
  constructor(message: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NoDataError.prototype);
  }
}
