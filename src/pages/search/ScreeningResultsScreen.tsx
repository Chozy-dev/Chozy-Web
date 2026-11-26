import { useCallback, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import backArrow from "../../assets/common/back-arrow.svg";
import Toast from "../../components/common/Toast";
import ScreeningFilters from "../../components/search/ScreeningFilters";
import ScreeningResultCard from "../../components/search/ScreeningResultCard";
import ScreeningSort from "../../components/search/ScreeningSort";
import ScreeningScoreInfo from "../../components/search/ScreeningScoreInfo";
import { createExampleScreeningResults, type CompetitionFilter, type ScreeningSort as SortOrder } from "../../data/screening";
import { KEYWORD_COUNT_LIMIT, normalizeKeywords } from "../../lib/keywordScreening";
import { selectScreeningResults } from "../../lib/screeningResults";

export default function ScreeningResultsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const keywords = normalizeKeywords(params.getAll("keyword").join("\n")).slice(0, KEYWORD_COUNT_LIMIT);
  const results = createExampleScreeningResults(keywords);
  const [sort, setSort] = useState<SortOrder>("upload");
  const [minimumVolume, setMinimumVolume] = useState("");
  const [competition, setCompetition] = useState<CompetitionFilter>("all");
  const [message, setMessage] = useState("");
  const closeToast = useCallback(() => setMessage(""), []);
  const visibleResults = selectScreeningResults(results, sort, Number(minimumVolume) || 0, competition);

  function goBack() {
    if (location.state?.fromSearch === true) navigate(-1);
    else navigate("/search", { replace: true, state: { keywordDraft: keywords.join("\n") } });
  }

  return (
    <main className="min-h-dvh bg-back pb-[calc(var(--compact-tab-bar-height)+env(safe-area-inset-bottom,0px)+24px)] text-black1">
      <header className="flex h-12 items-center px-4">
        <button type="button" onClick={goBack} aria-label="키워드 입력으로 돌아가기" className="relative before:absolute before:-inset-3">
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

        {visibleResults.length ? (
          <ul aria-label="스크리닝 결과 목록" className="mt-3 space-y-2">
            {visibleResults.map((result) => (
              <li key={result.id}>
                <ScreeningResultCard result={result} onSelect={() => setMessage("키워드 상세 결과를 준비 중이에요.")} />
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

      <Toast message={message} open={Boolean(message)} onClose={closeToast} bottom="above-nav" />
    </main>
  );
}
