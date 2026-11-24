import { useEffect, useId } from "react";
import { Info } from "lucide-react";
import Select from "../../components/common/Select";
import InterestPopover from "../../components/interest/InterestPopover";
import { ManagementHeader, PreferenceSwitch } from "./MyPageComponents";
import usePreference from "./usePreference";

const SWITCH_VALUES = ["on", "off"] as const;
const AI_SCORES = ["5", "10", "15"] as const;
const SEARCH_INCREASES = ["30", "50", "100"] as const;

const ALERT_GROUPS = [
  {
    id: "product-alerts",
    title: "관심상품 변동 알림",
    settings: [
      { name: "supply-price", label: "공급가 변동", initial: "on" },
      { name: "stock", label: "품절 / 재입고", initial: "off" },
      { name: "shipping", label: "출고 조건 변경", initial: "on" },
      { name: "search-volume", label: "검색량 급상승", initial: "on" },
      { name: "score-change", label: "AI 점수 변화", initial: "off" },
    ],
  },
  {
    id: "alert-channels",
    title: "알림 방식",
    settings: [
      { name: "push", label: "푸시 알림", initial: "on" },
      { name: "email", label: "이메일 알림", initial: "off" },
    ],
  },
] as const;

function AlertSwitchRow({ name, label, initial }: {
  name: string;
  label: string;
  initial: typeof SWITCH_VALUES[number];
}) {
  const labelId = useId();
  const [value, setValue] = usePreference(`alert-${name}`, SWITCH_VALUES, initial);

  return (
    <li className="flex min-h-[18px] items-center justify-between gap-2">
      <span id={labelId}>{label}</span>
      <PreferenceSwitch
        checked={value === "on"}
        onChange={(checked) => setValue(checked ? "on" : "off")}
        labelledBy={labelId}
        size="small"
      />
    </li>
  );
}

export default function AlertSettingsScreen() {
  const [score, setScore] = usePreference("ai-score", AI_SCORES, "5");
  const [increase, setIncrease] = usePreference("search-increase", SEARCH_INCREASES, "30");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-dvh bg-back pb-16 text-black1">
      <ManagementHeader title="알림 설정" />

      <div className="space-y-[18px] px-4 pt-5 text-sm leading-[17px] font-medium">
        {ALERT_GROUPS.map(({ id, title, settings }) => (
          <section key={id} aria-labelledby={id}>
            <div className="relative mx-2 mb-2 flex items-center gap-1">
              <h2 id={id}>{title}</h2>
              {id === "product-alerts" && (
                <InterestPopover
                  trigger={<Info size={12} aria-hidden />}
                  label="관심상품 변동 알림 설명"
                  triggerClassName="relative flex size-3 items-center justify-center before:absolute before:-inset-2"
                  className=""
                  panelClassName="absolute top-full -left-2 z-30 mt-2.5 w-[calc(100%+10px)] rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.12)]"
                >
                  {() => (
                    <>
                      <span aria-hidden className="absolute -top-2.5 left-[21px] h-0 w-0 border-x-8 border-b-[10px] border-x-transparent border-b-white" />
                      <p role="note" aria-label="관심상품 알림 갱신 주기" className="text-xs leading-4 font-normal text-zinc-500">
                        공급가·품절·재입고와 공급 조건 점수는 매일,<br />
                        쿠팡 시장가와 검색량·시장 조건이 반영된 점수는 보통 주 1회 확인해요.<br />
                        (상세 화면을 열면 하루 지난 시장가는 바로 갱신)<br />
                        쿠팡·네이버 조회 한도 안에서 모든 관심상품을 챙기기 위한 주기예요.
                      </p>
                    </>
                  )}
                </InterestPopover>
              )}
            </div>
            <ul className="space-y-6 rounded-[18px] bg-white p-5 text-neutral-600">
              {settings.map(({ name, label, initial }) => (
                <AlertSwitchRow key={name} name={name} label={label} initial={initial} />
              ))}
            </ul>
          </section>
        ))}

        <section aria-labelledby="alert-frequency">
          <h2 id="alert-frequency" className="mx-2 mb-2">빈도 설정</h2>
          <div className="space-y-4 rounded-[18px] bg-white px-5 py-4 text-neutral-600">
            <div className="flex items-center justify-between gap-2">
              <span id="search-volume-threshold">검색량 급상승 기준</span>
              <Select
                value={increase}
                onChange={setIncrease}
                options={SEARCH_INCREASES.map((value) => ({ value, label: `전주 대비 + ${value}% 이상` }))}
                variant="highlight"
                compact
                labelledBy="search-volume-threshold"
                className={increase === "100" ? "w-[155px] shrink-0" : "w-[147px] shrink-0"}
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <span id="ai-score-threshold">AI 점수 변동 기준</span>
              <Select
                value={score}
                onChange={setScore}
                options={AI_SCORES.map((value) => ({ value, label: `${value}점 이상` }))}
                variant="highlight"
                compact
                labelledBy="ai-score-threshold"
                className="w-[83px] shrink-0"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
