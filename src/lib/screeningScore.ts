import type { CompetitionLevel } from "../data/screening";

// 기능명세서 v24, 6쪽: 배점과 경쟁 유리도는 모두 가안입니다.
export const SCREENING_SCORE_WEIGHTS = {
  searchVolume: 25,
  clickRate: 15,
  growth: 25,
  competition: 25,
  shopping: 10,
} as const;

export const SCREENING_COMPETITION_FAVORABILITY: Record<CompetitionLevel, number> = {
  low: 80,
  medium: 50,
  high: 20,
};

type ScoreFactor = keyof typeof SCREENING_SCORE_WEIGHTS;

export interface ScreeningScoreInput {
  searchVolume?: number | null;
  /** 퍼센트 포인트 단위: 2.1은 2.1%입니다. */
  clickRate?: number | null;
  competition?: CompetitionLevel | null;
  /** 전년 동기 대비 퍼센트 포인트 단위: -15.3은 -15.3%입니다. */
  searchChange?: number | null;
  /** 분야 미선택 또는 데이터랩 생략 시 null로 전달합니다. */
  shoppingChange?: number | null;
}

export interface ScreeningScoreCalculation {
  score: number | null;
  availableWeight: number;
  contributions: Partial<Record<ScoreFactor, number>>;
  omittedFactors: ScoreFactor[];
}

const finite = (value: number | null | undefined): value is number => typeof value === "number" && Number.isFinite(value);
const clamp = (value: number, maximum: number) => Math.min(maximum, Math.max(0, value));

export function calculateScreeningScore(input: ScreeningScoreInput): ScreeningScoreCalculation {
  const contributions: ScreeningScoreCalculation["contributions"] = {};
  if (finite(input.searchVolume)) contributions.searchVolume = clamp(input.searchVolume, 30000) / 30000 * SCREENING_SCORE_WEIGHTS.searchVolume;
  if (finite(input.clickRate)) contributions.clickRate = clamp(input.clickRate, 8) / 8 * SCREENING_SCORE_WEIGHTS.clickRate;
  if (finite(input.searchChange)) contributions.growth = clamp(12.5 + input.searchChange / 100 * 12.5, SCREENING_SCORE_WEIGHTS.growth);
  if (input.competition != null) {
    const favorability = SCREENING_COMPETITION_FAVORABILITY[input.competition];
    if (finite(favorability)) contributions.competition = favorability / 100 * SCREENING_SCORE_WEIGHTS.competition;
  }
  if (finite(input.shoppingChange)) contributions.shopping = clamp(5 + input.shoppingChange / 100 * 5, SCREENING_SCORE_WEIGHTS.shopping);

  let availableWeight = 0;
  let total = 0;
  const omittedFactors: ScoreFactor[] = [];
  for (const factor of Object.keys(SCREENING_SCORE_WEIGHTS) as ScoreFactor[]) {
    const contribution = contributions[factor];
    if (contribution === undefined) omittedFactors.push(factor);
    else {
      total += contribution;
      availableWeight += SCREENING_SCORE_WEIGHTS[factor];
    }
  }

  // 점수 표시는 기존 화면처럼 정수로 반올림합니다. 데이터가 전혀 없으면 0점 대신 계산 대기입니다.
  return { score: availableWeight ? Math.round(total / availableWeight * 100) : null, availableWeight, contributions, omittedFactors };
}
