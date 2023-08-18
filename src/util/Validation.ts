/* eslint-disable @typescript-eslint/no-throw-literal */

export function validate<T extends Error>(check: boolean, throwable: T): void {
  if (!check) {
    throw throwable;
  }
}

export function validateIf<T extends Error>(condition: boolean, check: boolean, throwable: T): void {
  if (condition && !check) {
    throw throwable;
  }
}
