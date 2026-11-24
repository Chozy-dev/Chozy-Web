import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation } from "react-router";
import backArrow from "../../assets/common/back-arrow.svg";
import Toast from "../../components/common/Toast";

const INQUIRY_TYPES = ["분석 결과 문의", "결제 · 구독 문의", "오류 신고", "기능 제안", "기타"];

export default function CustomerSupportScreen() {
  const { state } = useLocation();
  const [inquiryType, setInquiryType] = useState("");
  const [content, setContent] = useState("");
  const [showNotice, setShowNotice] = useState(false);
  const characterCount = Array.from(content).length;
  const canSubmit = inquiryType !== "" && Array.from(content.trim()).length >= 10;
  const backTo = state?.fromFaq === true ? "/mypage/faq" : "/mypage";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (canSubmit) setShowNotice(true);
  }

  return (
    <main className="min-h-dvh bg-back px-4 pb-10 text-black1">
      <header className="flex h-12 items-center">
        <Link to={backTo} aria-label="뒤로" className="-ml-3 grid size-11 place-items-center">
          <img src={backArrow} alt="" className="size-5" />
        </Link>
      </header>

      <h1 className="mt-1 text-xl leading-6 font-semibold">고객센터</h1>
      <p className="mt-1.5 text-xs leading-[14px] text-graytext1">
        평일 10:00~18:00 (점심 12:00~13:00, 주말·공휴일 휴무)
      </p>

      <form onSubmit={handleSubmit} className="mt-6">
        <fieldset>
          <legend className="text-sm leading-[17px] font-medium">문의 유형</legend>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {INQUIRY_TYPES.map((type) => (
              <label key={type} className="cursor-pointer">
                <input
                  type="radio"
                  name="inquiry-type"
                  value={type}
                  checked={inquiryType === type}
                  onChange={() => setInquiryType(type)}
                  className="peer sr-only"
                />
                <span className="flex items-center justify-center whitespace-nowrap rounded-full bg-white px-2.5 py-2 text-[11px] leading-[13px] font-semibold text-zinc-500 peer-checked:bg-burgundy peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-dark">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-6">
          <label htmlFor="inquiry-content" className="block text-sm leading-[17px] font-medium">문의 내용</label>
          <textarea
            id="inquiry-content"
            name="inquiry-content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder={"어떤 점이 불편하셨는지 자세히 적어주시면 더 정확히\n도와드릴 수 있어요 (10자 이상)"}
            aria-describedby="inquiry-description"
            className="mt-2 block h-40 w-full resize-none rounded-2xl border border-neutral-200 bg-white p-[15px] text-sm leading-5 font-medium text-black1 outline-none placeholder:text-gray1 focus:border-rise"
          />
          <p id="inquiry-description" aria-live="polite" className="mt-3 pl-0.5 text-xs leading-[14px] font-medium text-graytext1">
            {characterCount}자 · 가입하신 이메일로 답변드려요
          </p>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-6 flex min-h-[45px] w-full items-center justify-center rounded-xl bg-burgundy px-3 text-xs font-medium text-white shadow-[0_2px_4px_rgba(0,0,0,0.12)] disabled:bg-zinc-300 disabled:shadow-none"
        >
          문의 보내기
        </button>
      </form>

      <Toast open={showNotice} onClose={() => setShowNotice(false)} message="문의 전송은 준비 중이에요." />
    </main>
  );
}
