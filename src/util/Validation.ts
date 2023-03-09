export function validate<T>(check: boolean, throwable: T): void {
  if (!check) {
    throw throwable;
  }
}

export function validateIf<T>(condition: boolean, check: boolean, throwable: T): void {
  if (condition && !check) {
    throw throwable;
  }
}
