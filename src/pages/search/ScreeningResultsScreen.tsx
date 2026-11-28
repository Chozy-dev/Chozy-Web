import { useEffect, useState } from "react";
import { createSearchParams, Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router";
import backArrow from "../../assets/common/back-arrow.svg";
import ScreeningFilters from "../../components/search/ScreeningFilters";
import ScreeningResultCard from "../../components/search/ScreeningResultCard";
import ScreeningSort from "../../components/search/ScreeningSort";
import ScreeningScoreInfo from "../../components/search/ScreeningScoreInfo";
import ScreeningKeywordDetails, { type ScreeningDetailPreferences } from "../../components/search/ScreeningKeywordDetails";
import { createExampleScreeningResults, type CompetitionFilter, type ScreeningSort as SortOrder } from "../../data/screening";
import { KEYWORD_COUNT_LIMIT, normalizeKeywords } from "../../lib/keywordScreening";
import { selectScreeningResults } from "../../lib/screeningResults";

export default function ScreeningResultsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resultId } = useParams();
  const [params] = useSearchParams();
  const keywords = normalizeKeywords(params.getAll("keyword").join("\n")).slice(0, KEYWORD_COUNT_LIMIT);
  const [sort, setSort] = useState<SortOrder>("upload");
  const [minimumVolume, setMinimumVolume] = useState("");
  const [competition, setCompetition] = useState<CompetitionFilter>("all");
  const [detailPreferences, setDetailPreferences] = useState<Record<string, ScreeningDetailPreferences>>({});
  const results = createExampleScreeningResults(keywords, (id) => detailPreferences[id]?.category ?? "none");
  const visibleResults = selectScreeningResults(results, sort, Number(minimumVolume) || 0, competition);
  const selectedResult = results.find((result) => result.id === resultId);
  const selectedResultVisible = visibleResults.some((result) => result.id === resultId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [resultId]);

  function goBack() {
    if (resultId) {
      if (location.state?.fromResults === true) navigate(-1);
      else navigate({ pathname: "/search/results", search: location.search }, { replace: true, state: { fromSearch: location.state?.fromSearch === true } });
    } else if (location.state?.fromSearch === true) navigate(-1);
    else navigate("/search", { replace: true, state: { keywordDraft: keywords.join("\n") } });
  }

  return (
    <main className="min-h-dvh bg-back pb-[calc(var(--compact-tab-bar-height)+env(safe-area-inset-bottom,0px)+24px)] text-black1">
      <header className="flex h-12 items-center px-4">
        <button type="button" onClick={goBack} aria-label={resultId ? "스크리닝 결과 목록으로 돌아가기" : "키워드 입력으로 돌아가기"} className="relative before:absolute before:-inset-3">
          <img src={backArrow} alt="" className="size-5" />
        </button>
      </header>

      <div className="px-4 pt-1">
        <h1 className="text-xl leading-6 font-semibold text-[#1a1a1a]" aria-live="polite">
          스크리닝 결과 ({visibleResults.length}/{results.length}개)
        </h1>
        <ScreeningScoreInfo />

        <div className="mt-3">
          <ScreeningSort value={sort} onChange={setSort} />
        </div>

        <div className="mt-4">
          <ScreeningFilters
            minimumVolume={minimumVolume}
            onMinimumVolumeChange={setMinimumVolume}
            competition={competition}
            onCompetitionChange={setCompetition}
          />
        </div>

        {resultId ? (
          selectedResult && selectedResultVisible ? (
            <div className="mt-3">
              <ScreeningKeywordDetails
                result={selectedResult}
                preferences={detailPreferences[resultId] ?? { category: "none", period: "12m" }}
                onPreferencesChange={(preferences) => setDetailPreferences((previous) => ({ ...previous, [resultId]: preferences }))}
                onAnalyze={() => navigate({ pathname: "/search/url", search: createSearchParams({ keyword: selectedResult.keyword }).toString() })}
              />
            </div>
          ) : (
            <div role="status" className="mt-3 rounded-2xl bg-white px-4 py-10 text-center text-sm leading-5 text-graytext1">
              <p>{selectedResult ? "선택한 키워드가 현재 필터 조건에 맞지 않아요." : "선택한 키워드를 찾을 수 없어요."}</p>
              <Link to={{ pathname: "/search/results", search: location.search }} replace state={{ fromSearch: location.state?.fromSearch === true }} className="mt-3 inline-block text-xs font-semibold text-burgundy underline">결과 목록 보기</Link>
            </div>
          )
        ) : visibleResults.length ? (
          <ul aria-label="스크리닝 결과 목록" className="mt-3 space-y-2">
            {visibleResults.map((result) => (
              <li key={result.id}>
                <ScreeningResultCard
                  result={result}
                  onSelect={() => navigate({ pathname: `/search/results/${result.id}`, search: location.search }, { state: { fromSearch: location.state?.fromSearch === true, fromResults: true } })}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div role="status" className="mt-3 rounded-2xl bg-white px-4 py-10 text-center text-sm leading-5 text-graytext1">
            {results.length ? (
              <>
                <p>조건에 맞는 키워드가 없어요.</p>
                <p className="mt-1 text-xs">최소 검색량이나 경쟁강도 조건을 변경해보세요.</p>
              </>
            ) : (
              <>
                <p>스크리닝할 키워드가 없어요.</p>
                <Link to="/search" className="mt-3 inline-block text-xs font-semibold text-burgundy underline">키워드 입력하기</Link>
              </>
            )}
          </div>
        )}
      </div>

    </main>
  );
}
