import { ChevronRight } from "lucide-react";
import type { RecentUrlAnalysis } from "../../data/urlAnalysis";

interface RecentUrlAnalysesProps {
  items: RecentUrlAnalysis[];
  onSelect: (item: RecentUrlAnalysis) => void;
}

export default function RecentUrlAnalyses({ items, onSelect }: RecentUrlAnalysesProps) {
  return (
    <section aria-labelledby="recent-url-analyses-title">
      <h2 id="recent-url-analyses-title" className="text-base leading-[19px] font-semibold text-[#1a1a1a]">최근 분석 기록</h2>
      <p className="mt-1 text-xs leading-[14px] font-medium text-graytext1">누르면 그때 만든 리포트를 그대로 열어요 · 횟수 차감 없음</p>
      {items.length ? (
        <ul className="mt-3 space-y-3">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item)}
                className="flex min-h-[61px] w-full items-center justify-between gap-3 rounded-2xl border border-divider bg-white px-3 py-3 text-left hover:bg-back focus-visible:bg-back"
              >
                <span className="min-w-0">
                  <span className="block break-all text-sm leading-[17px] font-medium text-black1">{item.url}</span>
                  <time dateTime={item.analyzedAt} className="mt-1 block text-xs leading-[14px] text-gray1">{item.analyzedAt.split("-").map((part, index) => index === 0 ? part : Number(part)).join(". ")} 분석</time>
                </span>
                <ChevronRight size={12} className="shrink-0 text-gray1" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-8 text-center text-xs text-gray1">최근 분석 기록이 없어요.</p>
      )}
    </section>
  );
}
