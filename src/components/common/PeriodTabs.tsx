/* 기간 탭 — 일간/주간/월간/연간, 활성 항목 회색 칩 */

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
    <div className="flex gap-1">
      {PERIOD_OPTIONS.map((p) => (
        <button
          key={p.k}
          onClick={() => onChange(p.k)}
          className={`text-xs rounded-md px-2 py-1 ${
            value === p.k ? "bg-gray-100 text-gray-900 font-semibold" : "text-gray-400"
          }`}
        >
          {p.l}
        </button>
      ))}
    </div>
  );
}
