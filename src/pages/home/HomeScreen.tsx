import { useNavigate } from "react-router";
import logo from "../../assets/home/logo.svg";
import alertIcon from "../../assets/home/alert.svg";
import ReportBanner from "./ReportBanner";
import ReportStepper from "./ReportStepper";
import MarginCalculator from "./MarginCalculator";
import PopularKeywordHub from "./PopularKeywordHub";

export default function HomeScreen() {
  const navigate = useNavigate();
  const goSearch = () => navigate("/search");

  return (
    <div className="pb-24">
      {/* 헤더 */}
      <header className="flex items-center justify-between px-5 pt-3 pb-2.5">
        <h1>
          <img src={logo} alt="Chozy" className="h-7 w-auto" />
        </h1>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate("/login")}
            className="inline-flex justify-center items-center px-2.5 py-1.5 bg-white rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)] text-sm font-semibold text-burgundy"
          >
            로그인
          </button>
          <button onClick={() => navigate("/notifications")}>
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
  );
}
