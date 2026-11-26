export const KEYWORD_CHARACTER_LIMIT = 300;
export const KEYWORD_COUNT_LIMIT = 10;

export function normalizeKeywords(value: string): string[] {
  return [...new Set(value.split(/\r\n|\n|\r/).map((keyword) => keyword.trim()).filter(Boolean))];
}
