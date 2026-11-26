import { calculateScreeningScore } from "../lib/screeningScore";
import { getExampleKeywordDetails, getExampleShoppingChange, type ShoppingCategory } from "./screeningDetails";

export type ScreeningSort = "upload" | "score" | "volume" | "competition";
export type CompetitionLevel = "low" | "medium" | "high";
export type CompetitionFilter = "all" | "medium-or-lower" | "low";
export type ScreeningBadgeTone = "red" | "yellow" | "blue";

export interface ScreeningResult {
  id: string;
  keyword: string;
  uploadOrder: number;
  searchVolume: number;
  score: number | null;
  scoreTone: ScreeningBadgeTone;
  competition: CompetitionLevel;
  competitionTone: ScreeningBadgeTone;
}

export const COMPETITION_LABELS: Record<CompetitionLevel, string> = {
  low: "낮음",
  medium: "보통",
  high: "높음",
};

// 원본 지표는 API 연결 전 예시값입니다. 점수는 v24 가안 산식으로 계산합니다.
// 스크리닝 배지의 색상 구간은 명세서에 없어 PNG 예시 색상을 유지합니다.
const EXAMPLE_SEARCH_VOLUMES = [15300, 24600, 8200, 31800, 5600, 19200, 12700, 9300, 28500, 4100];
const EXAMPLE_METRICS: Omit<ScreeningResult, "id" | "keyword" | "uploadOrder" | "score" | "searchVolume">[] = [
  { scoreTone: "red", competition: "high", competitionTone: "red" },
  { scoreTone: "yellow", competition: "medium", competitionTone: "yellow" },
  { scoreTone: "red", competition: "low", competitionTone: "blue" },
];

export function createExampleScreeningResults(keywords: string[], categoryForResult: (id: string) => ShoppingCategory = () => "none"): ScreeningResult[] {
  return keywords.map((keyword, index) => {
    const metrics = EXAMPLE_METRICS[index % EXAMPLE_METRICS.length];
    const searchVolume = EXAMPLE_SEARCH_VOLUMES[index % EXAMPLE_SEARCH_VOLUMES.length];
    const details = getExampleKeywordDetails(index);
    const id = `screening-${index}`;
    const { score } = calculateScreeningScore({
      searchVolume,
      clickRate: details.clickRate,
      competition: metrics.competition,
      searchChange: details.searchChange,
      shoppingChange: getExampleShoppingChange(categoryForResult(id)),
    });
    return { ...metrics, id, keyword, uploadOrder: index, searchVolume, score };
  });
}
