/* 기간 탭 — 일간/주간/월간/연간, 활성 항목만 회색 칩
   레이아웃·색상은 Figma 스펙 기준 */

export type Period = "daily" | "weekly" | "monthly" | "yearly";

export const PERIOD_OPTIONS: { k: Period; l: string }[] = [
  { k: "daily", l: "일간" },
  { k: "weekly", l: "주간" },
  { k: "monthly", l: "월간" },
  { k: "yearly", l: "연간" },
];

interface PeriodTabsProps {
  value: Period;
  onChange: (value: Period) => void;
}

export default function PeriodTabs({ value, onChange }: PeriodTabsProps) {
  return (
    <div className="inline-flex justify-start items-center">
      {PERIOD_OPTIONS.map((p) => {
        const active = value === p.k;
        return (
          <button
            key={p.k}
            onClick={() => onChange(p.k)}
            className={`p-1.5 flex justify-center items-center text-xs ${
              active ? "bg-back rounded-lg font-medium text-black2" : "font-normal text-gray1"
            }`}
          >
            {p.l}
          </button>
        );
      })}
    </div>
  );
}
