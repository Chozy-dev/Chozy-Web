import { useId } from "react";
import SegmentToggle, { type SegmentOption } from "../common/SegmentToggle";
import { EXAMPLE_SEARCH_TRENDS, type TrendPeriod } from "../../data/screeningDetails";
import { createTrendPath } from "../../lib/trendChart";

const PERIODS: SegmentOption<TrendPeriod>[] = [{ k: "30d", l: "30일" }, { k: "12m", l: "12개월" }];

interface SearchTrendChartProps {
  keyword: string;
  period: TrendPeriod;
  onPeriodChange: (period: TrendPeriod) => void;
}

export default function SearchTrendChart({ keyword, period, onPeriodChange }: SearchTrendChartProps) {
  const gradientId = useId();
  const data = EXAMPLE_SEARCH_TRENDS[period];
  const label = PERIODS.find((option) => option.k === period)!.l;
  const path = createTrendPath(data.values);

  return (
    <section aria-label={`${keyword} 검색 추이`}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xs leading-[14px] font-medium tracking-[-0.2px] text-graytext1">검색추이 {label}(상대지수, 최고점 = 100)</h3>
        <div className="shrink-0">
          <SegmentToggle label="검색 추이 기간" compact options={PERIODS} value={period} onChange={onPeriodChange} />
        </div>
      </div>
      <svg role="img" aria-label={`${keyword} ${label} 검색 추이, 상대지수 최고점 100`} viewBox="0 0 326 64" preserveAspectRatio="none" className="mt-4 block h-16 w-full overflow-visible">
        <title>{keyword} {label} 검색 추이</title>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#da284e" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#da284e" stopOpacity="0.01" />
          </linearGradient>
        </defs>
        <path d={`${path} L 326 64 L 0 64 Z`} fill={`url(#${gradientId})`} />
        <line x1="18" y1="4" x2="326" y2="4" stroke="#d7d7d7" strokeDasharray="4 4" strokeWidth="0.7" />
        <text x="0" y="7" fill="#979797" fontSize="8" fontWeight="500">100</text>
        <path d={path} fill="none" stroke="#da284e" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <line x1="0" y1="64" x2="326" y2="64" stroke="#d7d7d7" strokeWidth="0.7" />
      </svg>
      <div className="mt-1 flex justify-between text-[10px] leading-3 font-medium text-graytext1">
        <span>{data.start}</span><span>{data.end}</span>
      </div>
    </section>
  );
}
