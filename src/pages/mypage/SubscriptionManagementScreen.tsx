import { useEffect, useState } from "react";
import Toast from "../../components/common/Toast";
import { ManagementHeader } from "./MyPageComponents";
import { PREMIUM_BENEFITS, PREMIUM_MONTHLY_PRICE, USAGE } from "./profile";

const FREE_REPORT_LIMIT = `비용투자 적합도 분석 월 ${USAGE.freePlan.limit}회`;
const KEYWORD_SCREENING = "키워드 스크리닝 무제한";
const REPORT_PACKS = [
  { count: 5, price: "3,900원" },
  { count: 10, price: "6,900원" },
  { count: 20, price: "11,900원" },
];
const PAYMENT_SETTINGS = ["결제 수단 관리", "결제 내역", "자동결제 관리"];

export default function SubscriptionManagementScreen() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-dvh bg-back pb-[calc(var(--compact-tab-bar-height)+env(safe-area-inset-bottom,0px)+26px)] text-zinc-900">
      <ManagementHeader title="구독 관리" />

      <div className="px-4 pt-4">
        <section aria-labelledby="current-plan" className="flex translate-x-px items-start justify-between gap-2 rounded-[18px] bg-white p-5">
          <div className="min-w-0">
            <h2 id="current-plan" className="text-sm leading-[17px] font-semibold">무료 플랜</h2>
            <p className="mt-0.5 text-xs leading-[14px] font-medium text-gray1">{FREE_REPORT_LIMIT}, {KEYWORD_SCREENING}</p>
          </div>
          <span className="grid h-[21px] min-w-[47px] shrink-0 place-items-center rounded-full bg-[#ffe6ec] px-2 text-xs leading-none font-semibold text-rise">
            FREE
          </span>
        </section>

        <section aria-labelledby="plan-comparison" className="mt-[18px]">
          <h2 id="plan-comparison" className="px-1 text-base leading-5 font-semibold">요금제 비교</h2>
          <div className="mt-[11px] grid grid-cols-2 gap-3">
            <article className="min-w-0 rounded-2xl bg-white py-4 pr-3 pl-[clamp(12px,6vw,23px)]">
              <h3 className="text-xs leading-4 font-semibold text-black1">무료</h3>
              <p className="text-base leading-5 font-bold">0원</p>
              <ul className="mt-[5px] text-[10px] leading-[18px] font-medium text-graytext1">
                <li>{FREE_REPORT_LIMIT}</li>
                <li>{KEYWORD_SCREENING}</li>
                <li>관심상품 10개까지</li>
              </ul>
            </article>
            <article className="min-w-0 rounded-2xl bg-[#fff8f9] p-4 ring-1 ring-rise ring-inset">
              <h3 className="text-xs leading-4 font-bold text-burgundy">프리미엄</h3>
              <p className="flex items-baseline gap-1.5 text-base leading-5 font-bold">
                {PREMIUM_MONTHLY_PRICE} <span className="text-[10px] leading-none font-medium text-graytext1">/ 월</span>
              </p>
              <ul className="mt-[5px] text-[10px] leading-[18px] font-medium text-neutral-500">
                {PREMIUM_BENEFITS.map((benefit) => <li key={benefit}>{benefit}</li>)}
                <li>7일 무료체험</li>
              </ul>
            </article>
          </div>
          <button
            type="button"
            onClick={() => setMessage("7일 무료체험은 준비 중이에요.")}
            className="mt-3 block min-h-[45px] w-full rounded-xl bg-burgundy px-3 text-xs font-medium text-white"
          >
            7일 무료체험 시작하기
          </button>
        </section>

        <section aria-labelledby="report-packs" className="mt-6">
          <div className="px-1">
            <h2 id="report-packs" className="text-base leading-5 font-semibold">추가 리포트 구매</h2>
            <p className="mt-1 text-xs leading-[14px] font-medium text-graytext1">
              구독 한도와 별개로, 리포트 횟수만 더 필요할 때 바로 구매할 수 있어요.
            </p>
          </div>
          <ul className="mt-3.5 grid grid-cols-3 gap-2">
            {REPORT_PACKS.map(({ count, price }) => (
              <li key={count} className="flex flex-col items-center rounded-2xl bg-white px-1 py-3 text-center">
                <p className="text-base leading-5 font-bold">{count}회</p>
                <p className="mt-0.5 text-xs leading-[14px] font-medium text-graytext1">{price}</p>
                <button
                  type="button"
                  aria-label={`리포트 ${count}회 구매`}
                  onClick={() => setMessage("추가 리포트 구매는 준비 중이에요.")}
                  className="mt-2.5 min-w-[60px] rounded-full bg-rise-bg px-3 py-1 text-xs leading-[14px] font-semibold text-rise"
                >
                  구매
                </button>
              </li>
            ))}
          </ul>
        </section>

        <ul aria-label="결제 설정" className="mt-[17px] space-y-6 rounded-[18px] bg-white p-5 text-sm leading-[17px] font-semibold text-graytext1">
          {PAYMENT_SETTINGS.map((label) => (
            <li key={label} className="flex items-center justify-between gap-2 pr-1">
              <span>{label}</span>
              <span className="shrink-0 text-xs leading-[14px] font-medium text-gray1">준비중</span>
            </li>
          ))}
        </ul>
      </div>

      <Toast open={Boolean(message)} message={message} onClose={() => setMessage("")} bottom="above-button" />
    </main>
  );
}
