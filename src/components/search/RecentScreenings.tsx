import type { RecentScreening } from "../../data/search";

const SCORE_TONES: Record<RecentScreening["tone"], string> = {
  red: "bg-rise-bg text-rise",
  yellow: "bg-[#fffbe8] text-[#d2a300]",
  blue: "bg-fall-bg text-fall",
};

interface RecentScreeningsProps {
  items: RecentScreening[];
  onSelect: (item: RecentScreening) => void;
}

export default function RecentScreenings({ items, onSelect }: RecentScreeningsProps) {
  return (
    <section aria-labelledby="recent-screenings-title">
      <div className="flex items-center justify-between gap-3">
        <h2 id="recent-screenings-title" className="text-base leading-[19px] font-semibold text-[#191919]">
          최근 스크리닝한 상품
        </h2>
        <span className="text-xs leading-[14px] font-medium text-gray1">{items.length}개 분석함</span>
      </div>

      {items.length ? (
        <ul className="mt-6 px-3">
          {items.map((item) => (
            <li key={item.id} className="border-b border-[#f2f2f2]">
              <button
                type="button"
                onClick={() => onSelect(item)}
                className="flex min-h-[59px] w-full items-center justify-between gap-3 py-2 text-left"
              >
                <div className="min-w-0">
                  <h3 className="break-words text-base leading-[19px] font-semibold text-black1">{item.keyword}</h3>
                  <p className="mt-1 text-xs leading-[14px] text-gray1">
                    검색량 {item.searchVolume.toLocaleString("ko-KR")} · 경쟁강도 {item.competition.toFixed(2)}
                  </p>
                </div>
                <span className={`inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full px-1.5 py-0.5 text-xs leading-[14px] font-medium ${SCORE_TONES[item.tone]}`}>
                  {item.score}점
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-8 text-center text-xs text-gray1">최근 스크리닝한 상품이 없어요.</p>
      )}
    </section>
  );
}
