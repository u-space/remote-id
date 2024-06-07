export class CorruptedDatabaseError extends Error {
  constructor(message: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, CorruptedDatabaseError.prototype);
  }
}
