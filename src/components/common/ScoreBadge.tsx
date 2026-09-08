/* AI 추천 점수 배지 — 빨강(높음)/노랑(중간)/파랑(낮음) */

export type ScoreTone = "red" | "yellow" | "blue";

const TONES: Record<ScoreTone, string> = {
  red: "text-rise bg-rise-bg",
  yellow: "text-amber-500 bg-amber-50",
  blue: "text-fall bg-fall-bg",
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
    <span className={`inline-block whitespace-nowrap text-[9px] font-semibold rounded-md px-1.5 py-0.5 ${TONES[t]}`}>
      AI 추천 점수 {score}점
    </span>
  );
}
