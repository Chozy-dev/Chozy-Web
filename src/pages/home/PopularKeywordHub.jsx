import { useState } from "react";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import { getSubTier } from "../../lib/score";
import {
  CATEGORY_TREE,
  DEFAULT_RANK_COUNT,
  MAX_RANK_COUNT,
  buildKeywordData,
  buildProductData,
} from "../../data/home";

/* 인기 키워드 허브 — 카테고리·기간 필터 + 키워드/상품 랭킹 */

const PERIODS = [
  { k: "daily", l: "일간" },
  { k: "weekly", l: "주간" },
  { k: "monthly", l: "월간" },
  { k: "yearly", l: "연간" },
];

const ALL_KEYWORD_DATA = buildKeywordData(MAX_RANK_COUNT);
const ALL_PRODUCT_DATA = buildProductData(MAX_RANK_COUNT);

export default function PopularKeywordHub({ goSearch }) {
  const [category, setCategory] = useState("전체");
  const [subCategory, setSubCategory] = useState("전체");
  const [period, setPeriod] = useState("daily");
  const [view, setView] = useState("keyword");
  const [productSort, setProductSort] = useState("ai");
  const [expanded, setExpanded] = useState(false);

  const handleCategoryChange = (c) => {
    setCategory(c);
    setSubCategory("전체");
  };

  const visibleCount = expanded ? MAX_RANK_COUNT : DEFAULT_RANK_COUNT;
  const keywordData = ALL_KEYWORD_DATA.slice(0, visibleCount);
  const productData = ALL_PRODUCT_DATA.slice(0, visibleCount);
  const productSorted = [...productData].sort((a, b) =>
    productSort === "popular" ? a.rank - b.rank : b.aiScore - a.aiScore
  );

  return (
    <section className="mb-6">
      <p className="text-sm font-semibold text-stone-800 mb-2.5">인기 키워드</p>

      <div className="grid grid-cols-2 gap-2 mb-2.5">
        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="text-xs border border-stone-200 rounded-lg px-2.5 py-1.5 bg-white text-stone-700"
        >
          {Object.keys(CATEGORY_TREE).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {category !== "전체" ? (
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="text-xs border border-stone-200 rounded-lg px-2.5 py-1.5 bg-white text-stone-700"
          >
            {CATEGORY_TREE[category].map((s) => (
              <option key={s} value={s}>{s === "전체" ? "2차 전체" : s}</option>
            ))}
          </select>
        ) : (
          <div className="text-xs text-stone-300 border border-stone-100 rounded-lg px-2.5 py-1.5 bg-stone-50">
            2차 카테고리
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-2.5">
        <div className="flex gap-2.5">
          {PERIODS.map((p) => (
            <button
              key={p.k}
              onClick={() => setPeriod(p.k)}
              className={`text-[11px] ${period === p.k ? "text-primary font-semibold" : "text-stone-400"}`}
            >
              {p.l}
            </button>
          ))}
        </div>
        <div className="flex bg-white border border-stone-200 rounded-full p-0.5">
          {[
            { k: "keyword", l: "키워드" },
            { k: "product", l: "상품" },
          ].map((v) => (
            <button
              key={v.k}
              onClick={() => setView(v.k)}
              className={`text-[11px] rounded-full px-2 py-1 ${view === v.k ? "bg-primary text-white" : "text-stone-500"}`}
            >
              {v.l}
            </button>
          ))}
        </div>
      </div>

      {view === "keyword" ? (
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
      ) : (
        <>
          <div className="flex justify-end mb-2">
            <div className="flex bg-white border border-stone-200 rounded-full p-0.5">
              {[
                { k: "popular", l: "인기순" },
                { k: "ai", l: "AI 추천순" },
              ].map((s) => (
                <button
                  key={s.k}
                  onClick={() => setProductSort(s.k)}
                  className={`text-[11px] rounded-full px-2 py-1 ${productSort === s.k ? "bg-primary text-white" : "text-stone-500"}`}
                >
                  {s.l}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {productSorted.map((p, i) => (
              <button key={p.rank} onClick={goSearch} className="bg-white border border-stone-200 rounded-lg p-1.5 text-left">
                <div className="relative w-full h-16 rounded bg-stone-100 mb-1">
                  <span className="absolute top-1 left-1 bg-stone-900/70 text-white text-[9px] rounded px-1">{i + 1}</span>
                </div>
                <p className="text-[10px] text-stone-800 truncate">{p.name}</p>
                <p className="text-[10px] text-stone-500">{p.price}</p>
                {productSort === "ai" && <Badge tone={getSubTier(p.aiScore).tone}>{p.aiScore}점</Badge>}
              </button>
            ))}
          </div>
        </>
      )}

      <button onClick={() => setExpanded((v) => !v)} className="w-full text-center text-[11px] text-primary mt-2.5">
        {expanded ? "접기" : `더보기 (${MAX_RANK_COUNT}위까지)`}
      </button>
    </section>
  );
}
