import { useState } from "react";
import Select, { type SelectOption } from "../../components/common/Select";
import SegmentToggle from "../../components/common/SegmentToggle";
import PeriodTabs, { type Period } from "../../components/home/PeriodTabs";
import RankingListItem from "../../components/home/RankingListItem";
import ProductCard from "../../components/common/ProductCard";
import {
  CATEGORY_NAMES,
  CATEGORY_TREE,
  DEFAULT_RANK_COUNT,
  MAX_RANK_COUNT,
  buildKeywordData,
  buildProductData,
  type CategoryName,
} from "../../data/home";

/* 인기 키워드 — 1·2차 카테고리 + 기간 필터, 키워드/상품 랭킹 */

type RankingView = "keyword" | "product";
/** 상품 랭킹 정렬 — 인기순(등록 순위) / AI 추천순(점수 내림차순, 점수 배지 노출) */
type ProductSort = "popular" | "ai";

const ALL_KEYWORD_DATA = buildKeywordData(MAX_RANK_COUNT);
const ALL_PRODUCT_DATA = buildProductData(MAX_RANK_COUNT);

const CATEGORY_OPTIONS: SelectOption<CategoryName>[] = CATEGORY_NAMES.map((c) => ({ value: c, label: c }));

const VIEW_OPTIONS: { k: RankingView; l: string }[] = [
  { k: "keyword", l: "키워드" },
  { k: "product", l: "상품" },
];

const SORT_OPTIONS: { k: ProductSort; l: string }[] = [
  { k: "popular", l: "인기순" },
  { k: "ai", l: "AI 추천순" },
];

interface PopularKeywordHubProps {
  goSearch?: () => void;
}

export default function PopularKeywordHub({ goSearch }: PopularKeywordHubProps) {
  const [category, setCategory] = useState<CategoryName>("전체");
  const [subCategory, setSubCategory] = useState("전체");
  const [period, setPeriod] = useState<Period>("daily");
  const [view, setView] = useState<RankingView>("keyword");
  const [productSort, setProductSort] = useState<ProductSort>("popular");
  const [expanded, setExpanded] = useState(false);

  const handleCategoryChange = (c: CategoryName) => {
    setCategory(c);
    setSubCategory("전체");
  };

  const subOptions: SelectOption[] =
    category === "전체" ? [] : CATEGORY_TREE[category].map((s) => ({ value: s, label: s }));

  const visibleCount = expanded ? MAX_RANK_COUNT : DEFAULT_RANK_COUNT;
  const keywordData = ALL_KEYWORD_DATA.slice(0, visibleCount);
  const productData = [...ALL_PRODUCT_DATA]
    .sort((a, b) => (productSort === "ai" ? b.aiScore - a.aiScore : a.rank - b.rank))
    .slice(0, visibleCount);

  return (
    <section className="bg-white rounded-2xl mx-5 mb-3 p-5">
      <p className="text-[15px] font-bold text-gray-900 mb-3.5">인기 키워드</p>

      <div className="grid grid-cols-2 gap-2.5 mb-3">
        <Select value={category} options={CATEGORY_OPTIONS} onChange={handleCategoryChange} variant="highlight" />
        <Select
          value={subCategory}
          options={subOptions}
          onChange={setSubCategory}
          placeholder="2차 카테고리"
          disabled={category === "전체"}
          variant="highlight"
        />
      </div>

      <div className="flex items-center justify-between mb-1">
        <PeriodTabs value={period} onChange={setPeriod} />
        <SegmentToggle options={VIEW_OPTIONS} value={view} onChange={setView} />
      </div>

      {view === "keyword" ? (
        <div>
          {keywordData.map((k, i, arr) => (
            <RankingListItem
              key={k.rank}
              rank={k.rank}
              name={k.name}
              change={k.change}
              steps={k.steps}
              accent={k.rank === 1}
              last={i === arr.length - 1}
              onClick={goSearch}
            />
          ))}
        </div>
      ) : (
        <>
          <div className="flex mb-2">
            <SegmentToggle options={SORT_OPTIONS} value={productSort} onChange={setProductSort} />
          </div>
          <div className="grid grid-cols-3 gap-2 items-start">
            {productData.map((p, i) => (
              <ProductCard
                key={p.rank}
                rank={i + 1}
                brand={p.brand}
                name={p.name}
                price={p.price}
                score={p.aiScore}
                showScore={productSort === "ai"}
                onClick={goSearch}
              />
            ))}
          </div>
        </>
      )}

      <button onClick={() => setExpanded((v) => !v)} className="w-full text-center text-[13px] text-gray-400 pt-3.5">
        {expanded ? "접기" : "더보기"}
      </button>
    </section>
  );
}
