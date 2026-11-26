import { useCallback, useState } from "react";
import logo from "../../assets/home/logo.svg";
import Toast from "../../components/common/Toast";
import KeywordScreeningForm from "../../components/search/KeywordScreeningForm";
import RecentScreenings from "../../components/search/RecentScreenings";
import SearchModeTabs from "../../components/search/SearchModeTabs";
import { RECENT_SCREENINGS } from "../../data/search";

export default function KeywordScreeningScreen() {
  const [message, setMessage] = useState("");
  const closeToast = useCallback(() => setMessage(""), []);

  return (
    <main className="min-h-dvh bg-white pb-[calc(var(--compact-tab-bar-height)+env(safe-area-inset-bottom,0px)+24px)] text-black1">
      <header className="flex h-[52px] items-start px-5 pt-3">
        <h1>
          <img src={logo} alt="Chozy" className="h-[29px] w-20" />
          <span className="sr-only">키워드 스크리닝</span>
        </h1>
      </header>

      <div className="px-4">
        <div className="mt-4">
          <SearchModeTabs onUrlAnalysis={() => setMessage("URL 분석 기능을 준비 중이에요.")} />
        </div>

        <div className="mt-6">
          <KeywordScreeningForm
            onScreen={() => setMessage("스크리닝 결과 화면을 준비 중이에요.")}
          />
        </div>

        <div className="mt-10">
          <RecentScreenings items={RECENT_SCREENINGS} onSelect={() => setMessage("상품별 스크리닝 결과 화면을 준비 중이에요.")} />
        </div>
      </div>

      <Toast message={message} open={Boolean(message)} onClose={closeToast} bottom="above-nav" />
    </main>
  );
}
