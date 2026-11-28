import { createSearchParams, useLocation, useNavigate } from "react-router";
import SearchHeader from "../../components/search/SearchHeader";
import KeywordScreeningForm from "../../components/search/KeywordScreeningForm";
import RecentScreenings from "../../components/search/RecentScreenings";
import SearchModeTabs from "../../components/search/SearchModeTabs";
import { RECENT_SCREENINGS } from "../../data/search";

export default function KeywordScreeningScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialValue = typeof location.state?.keywordDraft === "string" ? location.state.keywordDraft : "";

  function startScreening(keywords: string[]) {
    navigate("/search", { replace: true, state: { keywordDraft: keywords.join("\n") } });
    navigate({ pathname: "/search/results", search: createSearchParams({ keyword: keywords }).toString() }, { state: { fromSearch: true } });
  }

  return (
    <main className="min-h-dvh bg-white pb-[calc(var(--compact-tab-bar-height)+env(safe-area-inset-bottom,0px)+24px)] text-black1">
      <SearchHeader title="키워드 스크리닝" />

      <div className="px-4">
        <div className="mt-4">
          <SearchModeTabs value="keyword" onChange={() => navigate("/search/url")} />
        </div>

        <div className="mt-6">
          <KeywordScreeningForm
            initialValue={initialValue}
            onScreen={startScreening}
          />
        </div>

        <div className="mt-10">
          <RecentScreenings items={RECENT_SCREENINGS} onSelect={(item) => startScreening([item.keyword])} />
        </div>
      </div>
    </main>
  );
}
