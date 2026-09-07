import { useState } from "react";
import Badge from "../../components/common/Badge";
import { getSubTier } from "../../lib/score";
import {
  CATEGORY_TREE,
  DEFAULT_RANK_COUNT,
  MAX_RANK_COUNT,
  buildKeywordData,
  buildProductData,
} from "../../data/home";

/* 인기 키워드 — 1·2차 카테고리 필터 + 키워드/상품 랭킹 */

const ALL_KEYWORD_DATA = buildKeywordData(MAX_RANK_COUNT);
const ALL_PRODUCT_DATA = buildProductData(MAX_RANK_COUNT);

function RankChange({ change, steps }) {
  if (change === "up") {
    return (
      <span className="text-[11px] font-semibold text-rise bg-rise-bg rounded-md px-1.5 py-0.5">▲ {steps}단계</span>
    );
  }
  if (change === "down") {
    return (
      <span className="text-[11px] font-semibold text-fall bg-fall-bg rounded-md px-1.5 py-0.5">▼ {steps}단계</span>
    );
  }
  if (change === "new") return <span className="text-xs text-gray-400">신규</span>;
  return <span className="text-xs text-gray-300">-</span>;
}

export default function PopularKeywordHub({ goSearch }) {
  const [category, setCategory] = useState("전체");
  const [subCategory, setSubCategory] = useState("전체");
  const [view, setView] = useState("keyword");
  const [expanded, setExpanded] = useState(false);

  const handleCategoryChange = (c) => {
    setCategory(c);
    setSubCategory("전체");
  };

  const visibleCount = expanded ? MAX_RANK_COUNT : DEFAULT_RANK_COUNT;
  const keywordData = ALL_KEYWORD_DATA.slice(0, visibleCount);
  const productData = ALL_PRODUCT_DATA.slice(0, visibleCount);

  return (
    <section className="bg-white rounded-2xl mx-3 mb-2.5 p-4">
      <p className="text-[15px] font-bold text-gray-900 mb-3.5">인기 키워드</p>

      <div className="grid grid-cols-2 gap-2.5 mb-3">
        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-gray-800"
        >
          {Object.keys(CATEGORY_TREE).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          disabled={category === "전체"}
          className="text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-gray-800 disabled:text-gray-300 disabled:bg-white"
        >
          {category === "전체" ? (
            <option>2차 카테고리</option>
          ) : (
            CATEGORY_TREE[category].map((s) => <option key={s} value={s}>{s === "전체" ? "2차 전체" : s}</option>)
          )}
        </select>
      </div>

      <div className="flex justify-end mb-1">
        <div className="flex bg-gray-100 rounded-full p-0.5">
          {[
            { k: "keyword", l: "키워드" },
            { k: "product", l: "상품" },
          ].map((v) => (
            <button
              key={v.k}
              onClick={() => setView(v.k)}
              className={`text-xs rounded-full px-3 py-1 ${
                view === v.k ? "bg-white text-gray-900 font-semibold shadow-sm" : "text-gray-400"
              }`}
            >
              {v.l}
            </button>
          ))}
        </div>
      </div>

      {view === "keyword" ? (
        <div>
          {keywordData.map((k, i, arr) => (
            <button
              key={k.rank}
              onClick={goSearch}
              className={`w-full flex items-center justify-between py-3 text-left ${
                i !== arr.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-sm font-semibold text-gray-400 w-4 text-center flex-shrink-0">{k.rank}</span>
                <span className="text-sm font-medium text-gray-900 truncate">{k.name}</span>
              </div>
              <RankChange change={k.change} steps={k.steps} />
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 pt-2">
          {productData.map((p, i) => (
            <button key={p.rank} onClick={goSearch} className="text-left">
              <div className="relative w-full h-16 rounded-lg bg-gray-100 mb-1">
                <span className="absolute top-1 left-1 bg-gray-900/70 text-white text-[9px] rounded px-1">{i + 1}</span>
              </div>
              <p className="text-[10px] text-gray-800 truncate">{p.name}</p>
              <p className="text-[10px] text-gray-500 mb-0.5">{p.price}</p>
              <Badge tone={getSubTier(p.aiScore).tone}>{p.aiScore}점</Badge>
            </button>
          ))}
        </div>
      )}

      <button onClick={() => setExpanded((v) => !v)} className="w-full text-center text-[13px] text-gray-400 pt-3.5">
        {expanded ? "접기" : "더보기"}
      </button>
    </section>
  );
}
