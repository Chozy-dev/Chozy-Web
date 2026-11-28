import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Toast from "../../components/common/Toast";
import SearchHeader from "../../components/search/SearchHeader";
import SearchModeTabs from "../../components/search/SearchModeTabs";
import UrlAnalysisForm from "../../components/search/UrlAnalysisForm";
import ManualAnalysisForm from "../../components/search/ManualAnalysisForm";
import UrlReportPreview from "../../components/search/UrlReportPreview";
import RecentUrlAnalyses from "../../components/search/RecentUrlAnalyses";
import { RECENT_URL_ANALYSES } from "../../data/urlAnalysis";

export default function UrlAnalysisScreen({ manual = false }: { manual?: boolean }) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [message, setMessage] = useState("");
  const closeToast = useCallback(() => setMessage(""), []);

  return (
    <main className="min-h-dvh bg-white pb-[calc(var(--compact-tab-bar-height)+env(safe-area-inset-bottom,0px)+24px)] text-black1">
      <SearchHeader title="URL 분석" />
      <div className="px-4">
        <div className="mt-4">
          <SearchModeTabs value="url" onChange={() => navigate("/search")} />
        </div>
        <div className={manual ? "mt-[21px]" : "mt-6"}>
          {manual ? <ManualAnalysisForm
            initialProductName={new URLSearchParams(search).get("keyword") ?? ""}
            onUrlInput={() => navigate(`/search/url${search}`)}
            onAnalyze={() => setMessage("직접 입력 분석 결과 화면을 준비 중이에요.")}
          /> : <UrlAnalysisForm
            description="상품 페이지 URL을 한 개씩 입력하거나 붙여넣으세요."
            onAnalyze={() => setMessage("URL 분석 결과 화면을 준비 중이에요.")}
            onManualInput={() => navigate(`/search/url/manual${search}`)}
          />}
        </div>
        <div className="mt-10">
          <UrlReportPreview />
        </div>
        <div className="mt-[38px]">
          <RecentUrlAnalyses items={RECENT_URL_ANALYSES} onSelect={() => setMessage("저장된 리포트 화면을 준비 중이에요.")} />
        </div>
      </div>
      <Toast message={message} open={Boolean(message)} onClose={closeToast} bottom="above-nav" />
    </main>
  );
}
