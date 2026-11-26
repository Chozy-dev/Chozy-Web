export const SHOPPING_CATEGORIES = [
  { value: "none", label: "선택 안 함 (쇼핑 반응 제외)" },
  { value: "fashion-clothing", label: "패션 의류" },
  { value: "fashion-accessories", label: "패션 잡화" },
  { value: "beauty", label: "화장품/미용" },
  { value: "digital", label: "디지털/가전" },
  { value: "furniture", label: "가구/인테리어" },
  { value: "baby", label: "출산/육아" },
  { value: "food", label: "식품" },
  { value: "sports", label: "스포츠/레저" },
  { value: "health", label: "생활/건강" },
  { value: "leisure", label: "여가/생활편의" },
  { value: "books", label: "도서" },
] as const;

export type ShoppingCategory = (typeof SHOPPING_CATEGORIES)[number]["value"];
export type TrendPeriod = "30d" | "12m";
export type ShoppingReaction = "golden" | "buzz" | "declining" | "quiet";

// 분야별 API 값과 시계열이 연결되기 전까지 사용하는 예시입니다.
const EXAMPLE_SHOPPING_CHANGES: Record<Exclude<ShoppingCategory, "none">, number> = {
  "fashion-clothing": 12.5,
  "fashion-accessories": -17,
  beauty: 3.1,
  digital: 12.5,
  furniture: -17,
  baby: 3.1,
  food: 12.5,
  sports: 3.1,
  health: -17,
  leisure: 12.5,
  books: -17,
};

export function getExampleShoppingChange(category: ShoppingCategory): number | null {
  return category === "none" ? null : EXAMPLE_SHOPPING_CHANGES[category];
}

const EXAMPLE_KEYWORD_DETAILS = [
  { clickRate: 2.1, adCount: 13, searchChange: -15.3 },
  { clickRate: 3.4, adCount: 8, searchChange: 18.2 },
  { clickRate: 1.8, adCount: 10, searchChange: 2.4 },
];

export function getExampleKeywordDetails(uploadOrder: number) {
  return EXAMPLE_KEYWORD_DETAILS[uploadOrder % EXAMPLE_KEYWORD_DETAILS.length];
}

export const EXAMPLE_SEARCH_TRENDS: Record<TrendPeriod, { values: number[]; start: string; end: string }> = {
  "12m": {
    values: [12, 58, 40, 48, 93, 88, 31, 42, 100, 49, 52, 81],
    start: "2025.12",
    end: "2026.11",
  },
  "30d": {
    values: [38, 41, 34, 45, 52, 59, 66, 54, 47, 56, 68, 81, 92, 100, 90, 76, 62, 45, 51, 60, 72, 83, 77, 69, 75, 81, 88, 79, 84, 91],
    start: "2026.10.28",
    end: "2026.11.26",
  },
};
