export function equalsIgnoreCase(a: string, b: string): boolean {
  return a.toLowerCase() === b.toLowerCase();
}

export function containsIgnoreCase(string: string, substring: string): boolean {
  return string.toLocaleLowerCase().includes(substring.toLocaleLowerCase());
}

export function regexCapture(text: string, regex: RegExp): string | undefined {
  return regex.exec(text)?.[1];
}
