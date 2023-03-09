export class AmuletError extends Error {
  public constructor(message: string) {
    super(message);

    // Set the prototype explicitly so that the instanceof operator works as expected.
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ProgramError extends AmuletError {
  public readonly code: string;

  public constructor(option: {
    message: string;
    code: string;
  }) {
    super(option.message);

    this.code = option.code;
  }
}

export class InsufficientCapacityError extends AmuletError {
}
