import { useState } from "react";
import { useNavigate } from "react-router";
import backArrow from "../../assets/common/back-arrow.svg";
import moreIcon from "../../assets/common/more.svg";
import searchIllust from "../../assets/auth/search.svg";
import checkOn from "../../assets/auth/check-circle-on.svg";
import checkOff from "../../assets/auth/check-circle-off.svg";
import AuthButton from "../../components/auth/AuthButton";
import TermsDetail from "./TermsDetail";
import { TERMS, type TermsKey } from "../../data/terms";

/* 회원가입 1단계 — 약관 동의
   행(체크+제목)을 누르면 동의 토글, 우측 화살표를 누르면 전문 열람.
   두 약관 모두 동의해야 '다음' 활성
   radius는 Figma rounded-sm → 12px 매핑(AuthButton과 동일) */

export default function TermsAgreementScreen() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState<Record<TermsKey, boolean>>({ service: false, privacy: false });
  const [viewing, setViewing] = useState<TermsKey | null>(null);

  const allAgreed = TERMS.every((t) => agreed[t.key]);
  const toggle = (key: TermsKey) => setAgreed((prev) => ({ ...prev, [key]: !prev[key] }));

  const viewingTerms = TERMS.find((t) => t.key === viewing);
  if (viewingTerms) return <TermsDetail terms={viewingTerms} onBack={() => setViewing(null)} />;

  return (
    <div className="min-h-screen bg-white flex flex-col px-4 pb-10">
      <header className="h-12 -mx-4 px-4 flex items-center">
        <button onClick={() => navigate(-1)} aria-label="뒤로" className="w-6 h-6 flex items-center justify-center">
          <img src={backArrow} alt="" className="w-5 h-5" />
        </button>
      </header>

      <h1 className="mt-3 text-xl font-semibold leading-7 text-zinc-900">
        서비스 이용을 위해
        <br />
        약관 동의가 필요해요.
      </h1>

      {/* 일러스트 — 제목·목록과 각각 100px 간격(Figma) */}
      <div className="mt-[100px] flex justify-center">
        <img src={searchIllust} alt="" className="w-24 h-24" />
      </div>

      {/* 약관 목록 */}
      <ul className="mt-[100px] flex flex-col gap-2">
        {TERMS.map((t) => (
          <li key={t.key} className="h-12 pl-4 pr-4 bg-stone-50 rounded-xl flex items-center">
            <button
              type="button"
              onClick={() => toggle(t.key)}
              aria-pressed={agreed[t.key]}
              className="flex-1 h-full flex items-center gap-2 text-base font-medium text-zinc-600"
            >
              <img src={agreed[t.key] ? checkOn : checkOff} alt="" className="w-6 h-6" />
              {t.title}
            </button>
            <button
              type="button"
              onClick={() => setViewing(t.key)}
              aria-label={`${t.title} 전문 보기`}
              className="flex-shrink-0"
            >
              <img src={moreIcon} alt="" className="w-6 h-6" />
            </button>
          </li>
        ))}
      </ul>

      {/* 다음 */}
      <div className="mt-auto pt-10 flex flex-col">
        <AuthButton disabled={!allAgreed} onClick={() => navigate("/signup/method")}>
          다음
        </AuthButton>
      </div>
    </div>
  );
}
