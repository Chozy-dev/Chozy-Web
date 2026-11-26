import type { CompetitionFilter, CompetitionLevel, ScreeningResult, ScreeningSort } from "../data/screening";

const COMPETITION_ORDER: Record<CompetitionLevel, number> = { low: 0, medium: 1, high: 2 };

export function selectScreeningResults(
  results: ScreeningResult[],
  sort: ScreeningSort,
  minimumVolume: number,
  competition: CompetitionFilter,
): ScreeningResult[] {
  return results
    .filter((result) => result.searchVolume >= minimumVolume && (
      competition === "all" || (competition === "low" ? result.competition === "low" : result.competition !== "high")
    ))
    .sort((a, b) => {
      let difference = 0;
      if (sort === "score") difference = (b.score ?? -1) - (a.score ?? -1);
      if (sort === "volume") difference = b.searchVolume - a.searchVolume;
      if (sort === "competition") difference = COMPETITION_ORDER[a.competition] - COMPETITION_ORDER[b.competition];
      return difference || a.uploadOrder - b.uploadOrder;
    });
}
