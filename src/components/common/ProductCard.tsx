import ScoreBadge from "./ScoreBadge";

/* 상품 카드 — 썸네일(순위 배지) + 브랜드 + 상품명 2줄 + 가격 + AI 점수(선택) */

interface ProductCardProps {
  rank: number;
  brand: string;
  name: string;
  /** 통화 기호까지 포함된 표시용 문자열 */
  price: string;
  score: number;
  showScore?: boolean;
  onClick?: () => void;
}

export default function ProductCard({ rank, brand, name, price, score, showScore = false, onClick }: ProductCardProps) {
  return (
    <button onClick={onClick} className="w-full text-left">
      <div className="relative w-full h-24 rounded-lg bg-gray-100 mb-1.5">
        <span className="absolute top-1.5 left-1.5 bg-gray-700 text-white text-[10px] rounded px-1.5 py-0.5">{rank}</span>
      </div>
      <p className="text-[10px] text-gray-400 mb-0.5">{brand}</p>
      <p className="text-xs text-gray-800 leading-snug line-clamp-2 mb-1">{name}</p>
      <p className="text-[13px] font-bold text-gray-900 mb-1">{price}</p>
      {showScore && <ScoreBadge score={score} />}
    </button>
  );
}
