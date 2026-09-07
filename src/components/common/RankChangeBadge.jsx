/* 순위 변동 배지 — ▲n단계(빨강) / ▼n단계(파랑) / 신규 / - */

export default function RankChangeBadge({ change, steps }) {
  if (change === "up") {
    return <span className="text-[11px] font-semibold text-rise bg-rise-bg rounded-md px-1.5 py-0.5">▲ {steps}단계</span>;
  }
  if (change === "down") {
    return <span className="text-[11px] font-semibold text-fall bg-fall-bg rounded-md px-1.5 py-0.5">▼ {steps}단계</span>;
  }
  if (change === "new") return <span className="text-xs text-gray-400">신규</span>;
  return <span className="text-xs text-gray-300">-</span>;
}
