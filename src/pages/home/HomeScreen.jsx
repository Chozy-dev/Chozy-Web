import { useState } from "react";
import logo from "../../assets/home/logo.svg";
import alertIcon from "../../assets/home/alert.svg";
import ReportBanner from "./ReportBanner";
import ReportStepper from "./ReportStepper";
import MarginCalculator from "./MarginCalculator";
import PopularKeywordHub from "./PopularKeywordHub";
import NotificationsView from "./NotificationsView";

export default function HomeScreen({ goSearch }) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      <div className="pb-24">
        {/* 헤더 */}
        <header className="flex items-center justify-between px-4 pt-3 pb-2.5">
          <h1>
            <img src={logo} alt="Chozy" className="h-7 w-auto" />
          </h1>
          <div className="flex items-center gap-2.5">
            <button className="text-xs font-medium text-gray-800 bg-white border border-gray-200 rounded-full px-3.5 py-1.5">
              로그인
            </button>
            <button onClick={() => setShowNotifications(true)}>
              <img src={alertIcon} alt="알림" className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* 무료 리포트 배너 */}
        <ReportBanner variant="used" />

        {/* 투자 리포트 만들기 스테퍼 */}
        <ReportStepper activeStep={1} />

        {/* 간단 마진 계산기 */}
        <MarginCalculator onVerify={goSearch} />

        {/* 인기 키워드 */}
        <PopularKeywordHub goSearch={goSearch} />
      </div>

      {/* 알림 오버레이 */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center" onClick={() => setShowNotifications(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md relative m-4 bg-page rounded-2xl overflow-y-auto shadow-xl"
          >
            <NotificationsView onBack={() => setShowNotifications(false)} />
          </div>
        </div>
      )}
    </>
  );
}
