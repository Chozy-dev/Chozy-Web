export type ScreeningSort = "upload" | "score" | "volume" | "competition";
export type CompetitionLevel = "low" | "medium" | "high";
export type CompetitionFilter = "all" | "medium-or-lower" | "low";
export type ScreeningBadgeTone = "red" | "yellow";

export interface ScreeningResult {
  id: string;
  keyword: string;
  uploadOrder: number;
  searchVolume: number;
  score: number;
  scoreTone: ScreeningBadgeTone;
  competition: CompetitionLevel;
  competitionTone: ScreeningBadgeTone;
}

export const COMPETITION_LABELS: Record<CompetitionLevel, string> = {
  low: "낮음",
  medium: "보통",
  high: "높음",
};

// API 연결 전 PNG 예시값을 사용합니다. 배지 색상은 점수 구간을 추정하지 않고 보존합니다.
const EXAMPLE_METRICS: Omit<ScreeningResult, "id" | "keyword" | "uploadOrder">[] = [
  { searchVolume: 15300, score: 45, scoreTone: "red", competition: "high", competitionTone: "red" },
  { searchVolume: 15300, score: 64, scoreTone: "yellow", competition: "medium", competitionTone: "yellow" },
  { searchVolume: 15300, score: 45, scoreTone: "red", competition: "high", competitionTone: "red" },
];

export function createExampleScreeningResults(keywords: string[]): ScreeningResult[] {
  return keywords.map((keyword, index) => ({
    ...EXAMPLE_METRICS[index % EXAMPLE_METRICS.length],
    id: `screening-${index}`,
    keyword,
    uploadOrder: index,
  }));
}
