import { ChevronRight, Info } from "lucide-react";
import { Link } from "react-router";
import defaultAvatar from "../../assets/mypage/search-gray.svg";
import { AccountActions, PlanBadge, PreferenceSwitch, UsageProgress } from "./MyPageComponents";
import { PREMIUM_BENEFITS, PREMIUM_MONTHLY_PRICE, PROFILE, USAGE } from "./profile";
import usePreference from "./usePreference";

const MANAGEMENT_LINKS = [
  { label: "계정 관리", to: "/mypage/account" },
  { label: "구독 관리", to: "/mypage/subscription" },
  { label: "알림 설정", to: "/mypage/alerts" },
];
const UPCOMING = ["쿠폰 등록", "자주 묻는 질문", "고객센터"];
const CONSENT_OPTIONS = ["on", "off"] as const;

export default function MyPageScreen() {
  const [marketingConsent, setMarketingConsent] = usePreference("marketing", CONSENT_OPTIONS, "on");

  return (
    <main className="flex min-h-dvh flex-col bg-white pb-[calc(var(--compact-tab-bar-height)+env(safe-area-inset-bottom,0px))] text-black1">
      <div className="px-4">
        <header className="flex h-12 items-center">
          <h1 className="text-xl leading-7 font-semibold">마이페이지</h1>
        </header>

        <section aria-label="프로필" className="mt-5 flex items-center gap-4">
          <div className="grid size-[60px] shrink-0 place-items-center overflow-hidden rounded-full bg-back">
            <img src={defaultAvatar} alt="기본 프로필 사진" className="size-[47px]" />
          </div>
          <div className="flex min-w-0 flex-col items-start">
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="text-base leading-5 font-semibold">{PROFILE.name} 님</p>
              <PlanBadge plan="Free" />
            </div>
            <p className="mt-px break-all text-xs leading-4 text-gray1">{PROFILE.email}</p>
            <span className="mt-0.5 rounded-full bg-back px-1.5 py-1 text-[8px] leading-[9px] font-semibold text-black2">
              함께한지 {PROFILE.daysSinceSignup}일째
            </span>
          </div>
        </section>

        <section aria-labelledby="mypage-usage" className="mt-8">
          <h2 id="mypage-usage" className="text-base leading-[23px] font-semibold">이번 달 이용 내역</h2>
          <p className="text-xs leading-4 font-medium text-gray1">{USAGE.period}</p>

          <div className="mt-3.5 grid grid-cols-2 gap-2">
            <div className="flex min-h-[101px] flex-col rounded-2xl bg-back p-4">
              <h3 className="text-xs leading-4 font-medium text-graytext1">비용투자 적합도</h3>
              <p className="text-lg leading-6 font-semibold">{USAGE.investment.used}/{USAGE.investment.limit} 회</p>
              <div className="mt-auto pt-3 pb-1">
                <UsageProgress {...USAGE.investment} />
              </div>
            </div>
            <div className="flex min-h-[101px] flex-col rounded-2xl bg-back p-4">
              <h3 className="text-xs leading-4 font-medium text-graytext1">키워드 스크리닝</h3>
              <p className="text-lg leading-6 font-semibold">{USAGE.keywordScreenings}회</p>
              <p className="mt-auto pt-3 pb-0.5 text-xs leading-4 font-semibold">무제한 이용 가능</p>
            </div>
          </div>

          <div className="mt-2 rounded-2xl bg-back px-3 pt-[15px] pb-3 text-center text-xs leading-[18px] font-medium">
            <p className="flex items-center justify-center gap-0.5 text-graytext1">
              <Info size={12} aria-hidden />
              이번 달 이만큼 아꼈어요
            </p>
            <p>직접 조사했다면 약 4시간 · 상표 분쟁 리스크 예방</p>
          </div>
        </section>

        <section aria-labelledby="mypage-plan" className="mt-[23px] border-t border-line pt-[22px]">
          <div className="flex items-start justify-between gap-2">
            <div className="pt-0.5">
              <h2 id="mypage-plan" className="text-base leading-[23px] font-semibold">무료 플랜</h2>
              <p className="text-xs leading-4 font-medium text-graytext1">기본 기능을 무료로 이용할 수 있어요.</p>
            </div>
            <span className="inline-flex h-[21px] min-w-[47px] shrink-0 items-center justify-center rounded-full bg-[#ffe6ec] px-2 text-[9.23px] leading-none font-semibold text-rise">
              {USAGE.freePlan.used}/{USAGE.freePlan.limit} 사용
            </span>
          </div>

          <div className="mt-3.5 rounded-2xl bg-back p-5">
            <p className="text-xs leading-4 font-medium text-neutral-500">{PREMIUM_BENEFITS.join(", ")}</p>
            <p className="mt-0.5 text-sm leading-4 font-semibold">프리미엄 월 {PREMIUM_MONTHLY_PRICE}</p>
            <Link
              to="/mypage/subscription"
              className="mt-[17px] flex min-h-[45px] items-center justify-center rounded-xl bg-burgundy px-3 text-center text-xs font-medium text-white"
            >
              7일 무료체험 시작하기
            </Link>
          </div>
        </section>

        <nav aria-label="마이페이지 메뉴" className="mt-5">
          <ul className="text-base leading-5 font-semibold">
            {MANAGEMENT_LINKS.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className="flex min-h-[42px] items-center justify-between gap-3 px-4">
                  {label}
                  <ChevronRight size={16} className="shrink-0 text-graytext1" aria-hidden />
                </Link>
              </li>
            ))}
            {UPCOMING.map((label) => (
              <li key={label} className="flex min-h-[42px] items-center justify-between gap-3 px-4 text-graytext1">
                {label}
                <span className="pr-1 text-xs font-medium text-gray1">준비중</span>
              </li>
            ))}
          </ul>
        </nav>

        <section className="mt-[11px] flex items-center justify-between gap-4 border-t-2 border-[#f5f5f5] px-4 pt-[23px] pb-5">
          <div>
            <h2 id="marketing-consent" className="text-base leading-5 font-semibold">광고성 정보 수신 동의</h2>
            <p id="marketing-description" className="mt-0.5 text-xs leading-4 text-gray1">신규 소식·혜택 안내를 받아요</p>
          </div>
          <PreferenceSwitch
            checked={marketingConsent === "on"}
            onChange={(checked) => setMarketingConsent(checked ? "on" : "off")}
            labelledBy="marketing-consent"
            describedBy="marketing-description"
          />
        </section>
      </div>

      <footer className="min-h-[145px] flex-1 bg-back px-4 pt-8 text-center text-xs leading-[14px] font-medium text-gray1">
        <p className="flex justify-center gap-1">
          <Link to="/mypage/terms">이용약관</Link>
          <span aria-hidden>|</span>
          <Link to="/mypage/privacy">개인정보처리방침</Link>
        </p>
        <AccountActions />
      </footer>
    </main>
  );
}
