import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import { CATEGORY_TREE, DEFAULT_RANK_COUNT, MAX_RANK_COUNT, buildKeywordData } from "../../data/home";

/* 인기 키워드 허브 — 카테고리·기간 필터 + 키워드/상품 랭킹
   (스타일링 단계: 기본 뷰(키워드·일간) 기준, 전환 로직은 상태 단계에서) */

const PERIODS = [
  { k: "daily", l: "일간" },
  { k: "weekly", l: "주간" },
  { k: "monthly", l: "월간" },
  { k: "yearly", l: "연간" },
];

export default function PopularKeywordHub() {
  const keywordData = buildKeywordData(DEFAULT_RANK_COUNT);

  return (
    <section className="mb-6">
      <p className="text-sm font-semibold text-stone-800 mb-2.5">인기 키워드</p>

      <div className="grid grid-cols-2 gap-2 mb-2.5">
        <select className="text-xs border border-stone-200 rounded-lg px-2.5 py-1.5 bg-white text-stone-700">
          {Object.keys(CATEGORY_TREE).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <div className="text-xs text-stone-300 border border-stone-100 rounded-lg px-2.5 py-1.5 bg-stone-50">
          2차 카테고리
        </div>
      </div>

      <div className="flex items-center justify-between mb-2.5">
        <div className="flex gap-2.5">
          {PERIODS.map((p, i) => (
            <button key={p.k} className={`text-[11px] ${i === 0 ? "text-primary font-semibold" : "text-stone-400"}`}>
              {p.l}
            </button>
          ))}
        </div>
        <div className="flex bg-white border border-stone-200 rounded-full p-0.5">
          <button className="text-[11px] rounded-full px-2 py-1 bg-primary text-white">키워드</button>
          <button className="text-[11px] rounded-full px-2 py-1 text-stone-500">상품</button>
        </div>
      </div>

      <Card>
        {keywordData.map((k, i, arr) => (
          <div
            key={k.rank}
            className={`flex items-center justify-between px-3 py-2.5 ${i !== arr.length - 1 ? "border-b border-stone-100" : ""}`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-400 w-3">{k.rank}</span>
              <span className="text-sm text-stone-800">{k.name}</span>
              {k.change === "new" && <Badge tone="danger">NEW</Badge>}
            </div>
            <span
              className={`text-xs ${
                k.change === "up" ? "text-emerald-700" : k.change === "down" ? "text-rose-700" : "text-stone-400"
              }`}
            >
              {k.pct}
            </span>
          </div>
        ))}
      </Card>

      <button className="w-full text-center text-[11px] text-primary mt-2.5">더보기 ({MAX_RANK_COUNT}위까지)</button>
    </section>
  );
}
