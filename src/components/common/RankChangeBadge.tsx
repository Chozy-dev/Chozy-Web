import type { RankChange } from "../../data/home";

/* 순위 변동 배지 — ▲n단계(상승) / ▼n단계(하락) / 신규 / -
   레이아웃·색상은 Figma 단계 컴포넌트 스펙 기준 */

/** 16px 박스 안의 10×6 삼각형 (Figma 스펙 좌표) */
function Triangle({ direction }: { direction: "up" | "down" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="flex-shrink-0">
      <path
        d={direction === "up" ? "M7.5 4.5L12.5 10.5H2.5L7.5 4.5Z" : "M7.5 11.5L2.5 5.5H12.5L7.5 11.5Z"}
        fill="currentColor"
      />
    </svg>
  );
}

interface RankChangeBadgeProps {
  change: RankChange;
  steps: number;
}

export default function RankChangeBadge({ change, steps }: RankChangeBadgeProps) {
  if (change === "up" || change === "down") {
    const up = change === "up";
    return (
      <span
        className={`pl-1 pr-1.5 py-1 rounded-[100px] inline-flex justify-center items-center gap-0.5 text-xs font-medium ${
          up ? "bg-rise-bg text-rise" : "bg-fall-bg text-fall"
        }`}
      >
        <Triangle direction={up ? "up" : "down"} />
        {steps}단계
      </span>
    );
  }
  if (change === "new") return <span className="text-xs text-gray-400">신규</span>;
  return <span className="text-xs text-gray-300">-</span>;
}
