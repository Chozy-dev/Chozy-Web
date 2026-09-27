import backArrow from "../../assets/common/back-arrow.svg";
import type { Terms } from "../../data/terms";

/* 약관 전문 — 약관 동의 화면 위에 전체 화면으로 덮어 보여줌
   별도 라우트가 아니라 동의 상태를 잃지 않고 뒤로 돌아올 수 있음 */

interface TermsDetailProps {
  terms: Terms;
  onBack: () => void;
}

export default function TermsDetail({ terms, onBack }: TermsDetailProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="relative h-12 px-4 flex items-center">
        <button onClick={onBack} aria-label="뒤로" className="relative z-10 w-6 h-6 flex items-center justify-center">
          <img src={backArrow} alt="" className="w-5 h-5" />
        </button>
        <h1 className="absolute inset-x-0 text-center text-lg font-semibold text-zinc-900">{terms.title}</h1>
      </header>

      <div className="px-4 pt-3 pb-10 text-sm leading-6 text-zinc-600">
        {terms.body.map((line, i) => (line === "" ? <div key={i} className="h-6" /> : <p key={i}>{line}</p>))}
      </div>
    </div>
  );
}
