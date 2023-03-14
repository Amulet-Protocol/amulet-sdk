export class AmuletError extends Error {
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
