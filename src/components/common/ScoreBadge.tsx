/* AI 추천 점수 배지 — 빨강(높음)/노랑(중간)/파랑(낮음) */

export type ScoreTone = "red" | "yellow" | "blue";

const TONES: Record<ScoreTone, string> = {
  red: "bg-pink-100 text-rose-600",
  yellow: "bg-amber-100 text-amber-600",
  blue: "bg-blue-100 text-blue-600",
};

export function scoreTone(score: number): ScoreTone {
  if (score >= 75) return "red";
  if (score >= 50) return "yellow";
  return "blue";
}

interface ScoreBadgeProps {
  score: number;
  /** 생략 시 점수 구간으로 자동 결정 */
  tone?: ScoreTone;
}

export default function ScoreBadge({ score, tone }: ScoreBadgeProps) {
  const t = tone ?? scoreTone(score);
  return (
    <div className={`p-1 rounded-sm inline-flex justify-start items-center gap-0.5 ${TONES[t]}`}>
      <div className="text-[10px] font-semibold whitespace-nowrap">AI 추천 점수 {score}점</div>
    </div>
  );
}
