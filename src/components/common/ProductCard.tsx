import ScoreBadge from "./ScoreBadge";

/* 상품 카드 — 썸네일(순위 배지) + 브랜드 + 상품명 + 가격 + AI 점수(선택)
   레이아웃·타이포는 Figma 공통 컴포넌트 스펙 기준 */

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
    <button
      onClick={onClick}
      className="w-full pb-2 relative bg-white rounded-tl-lg rounded-tr-lg rounded-bl-md rounded-br-md outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex flex-col justify-start items-start gap-1.5"
    >
      <div className="self-stretch h-24 bg-neutral-200 rounded-tl-lg rounded-tr-lg border border-neutral-100" />

      <div className="self-stretch px-1 flex flex-col justify-start items-start gap-1.5">
        <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
          <div className="self-stretch text-left text-neutral-500 text-[10px] font-semibold line-clamp-2">{brand}</div>
          <div className="self-stretch text-left text-neutral-900 text-xs font-normal line-clamp-2">{name}</div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-1">
          <div className="self-stretch text-left text-neutral-900 text-sm font-semibold">{price}</div>
          {showScore && <ScoreBadge score={score} />}
        </div>
      </div>

      <div className="size-6 left-[2px] top-[2px] absolute bg-stone-900/70 rounded-tl-md rounded-br-md flex flex-col justify-center items-center gap-2.5">
        <div className="text-white text-sm font-normal">{rank}</div>
      </div>
    </button>
  );
}
