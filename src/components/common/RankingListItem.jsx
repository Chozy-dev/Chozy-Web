import RankChangeBadge from "./RankChangeBadge";

/* 랭킹 리스트 아이템 — 순위 + 키워드명 + 변동 배지 (1위는 순위 숫자 강조) */

export default function RankingListItem({ rank, name, change, steps, accent = false, last = false, onClick }) {
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
