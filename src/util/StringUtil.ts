export function equalsIgnoreCase(a: string, b: string): boolean {
  return a.toLowerCase() === b.toLowerCase();
}

export function containsIgnoreCase(string: string, substring: string): boolean {
  return string.toLocaleLowerCase().includes(substring.toLocaleLowerCase());
}
