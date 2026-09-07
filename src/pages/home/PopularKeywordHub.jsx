import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import { CATEGORY_TREE, DEFAULT_RANK_COUNT, MAX_RANK_COUNT, buildKeywordData } from "../../data/home";

/* 인기 키워드 허브 — 카테고리·기간 필터 + 키워드/상품 랭킹
   (마크업 단계: 기본 뷰(키워드·일간)만 정적 렌더링, 전환 로직은 상태 단계에서) */

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
      <p className="mb-2.5">인기 키워드</p>

      <div className="grid grid-cols-2 gap-2 mb-2.5">
        <select className="border rounded-lg px-2.5 py-1.5">
          {Object.keys(CATEGORY_TREE).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <div className="border rounded-lg px-2.5 py-1.5">2차 카테고리</div>
      </div>

      <div className="flex items-center justify-between mb-2.5">
        <div className="flex gap-2.5">
          {PERIODS.map((p) => (
            <button key={p.k}>{p.l}</button>
          ))}
        </div>
        <div className="flex border rounded-full p-0.5">
          <button className="rounded-full px-2 py-1">키워드</button>
          <button className="rounded-full px-2 py-1">상품</button>
        </div>
      </div>

      <Card>
        {keywordData.map((k, i, arr) => (
          <div key={k.rank} className={`flex items-center justify-between px-3 py-2.5 ${i !== arr.length - 1 ? "border-b" : ""}`}>
            <div className="flex items-center gap-2">
              <span className="w-3">{k.rank}</span>
              <span>{k.name}</span>
              {k.change === "new" && <Badge tone="danger">NEW</Badge>}
            </div>
            <span>{k.pct}</span>
          </div>
        ))}
      </Card>

      <button className="w-full text-center mt-2.5">더보기 ({MAX_RANK_COUNT}위까지)</button>
    </section>
  );
}
