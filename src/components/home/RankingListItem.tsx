import RankChangeBadge from "./RankChangeBadge";
import type { RankChange } from "../../data/home";

/* 랭킹 리스트 아이템 — 순위 + 키워드명 + 변동 배지 (1위는 순위 숫자 강조) */

interface RankingListItemProps {
  rank: number;
  name: string;
  change: RankChange;
  steps: number;
  /** 순위 숫자를 프라이머리 색으로 강조 (1위) */
  accent?: boolean;
  /** 마지막 행이면 하단 보더 제거 */
  last?: boolean;
  onClick?: () => void;
}

export default function RankingListItem({
  rank,
  name,
  change,
  steps,
  accent = false,
  last = false,
  onClick,
}: RankingListItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between py-3 text-left ${last ? "" : "border-b border-gray-100"}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className={`text-sm font-semibold w-4 text-center flex-shrink-0 ${accent ? "text-primary" : "text-gray-400"}`}>
          {rank}
        </span>
        <span className="text-sm font-medium text-gray-900 truncate">{name}</span>
      </div>
      <RankChangeBadge change={change} steps={steps} />
    </button>
  );
}
