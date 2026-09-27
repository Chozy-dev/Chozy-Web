import { useState } from "react";
import { useNavigate } from "react-router";
import backArrow from "../../assets/common/back-arrow.svg";
import checkOn from "../../assets/auth/check-circle-on.svg";
import checkOff from "../../assets/auth/check-circle-off.svg";
import AuthButton from "../../components/auth/AuthButton";

/* 회원가입 2단계 — 본인 확인 방법 선택 (휴대폰 / 이메일 중 하나)
   선택해야 '다음' 활성 */

type VerifyMethod = "phone" | "email";

const METHODS: { key: VerifyMethod; label: string }[] = [
  { key: "phone", label: "휴대폰 번호로\n인증하기" },
  { key: "email", label: "이메일로\n인증하기" },
];

export default function VerifyMethodScreen() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<VerifyMethod | null>(null);

  return (
    <div className="min-h-screen bg-white flex flex-col px-4 pb-10">
      <header className="h-12 -mx-4 px-4 flex items-center">
        <button onClick={() => navigate(-1)} aria-label="뒤로" className="w-6 h-6 flex items-center justify-center">
          <img src={backArrow} alt="" className="w-5 h-5" />
        </button>
      </header>

      <h1 className="mt-3 text-xl font-semibold leading-7 text-zinc-900">
        본인 확인 방법을
        <br />
        선택해주세요.
      </h1>

      {/* 방법 카드 — 제목과 60px 간격(Figma) */}
      <div role="radiogroup" className="mt-[60px] flex gap-2">
        {METHODS.map((m) => {
          const selected = method === m.key;
          return (
            <button
              key={m.key}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setMethod(m.key)}
              className="flex-1 p-5 bg-stone-50 rounded-2xl flex flex-col items-start gap-5 text-left"
            >
              <img src={selected ? checkOn : checkOff} alt="" className="w-6 h-6" />
              <span className="text-base font-semibold leading-6 text-zinc-600 whitespace-pre-line">{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* 다음 */}
      <div className="mt-auto pt-10 flex flex-col">
        <AuthButton disabled={!method} onClick={() => navigate(`/signup/verify/${method}`)}>
          다음
        </AuthButton>
      </div>
    </div>
  );
}
