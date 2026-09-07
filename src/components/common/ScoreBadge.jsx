/* AI 추천 점수 배지 — 빨강(높음)/노랑(중간)/파랑(낮음) */

const TONES = {
  red: "text-rise bg-rise-bg",
  yellow: "text-amber-500 bg-amber-50",
  blue: "text-fall bg-fall-bg",
};

export function scoreTone(score) {
  if (score >= 75) return "red";
  if (score >= 50) return "yellow";
  return "blue";
}

export default function ScoreBadge({ score, tone }) {
  const t = tone ?? scoreTone(score);
  return (
    <span className={`inline-block text-[10px] font-semibold rounded-md px-1.5 py-0.5 ${TONES[t]}`}>
      AI 추천 점수 {score}점
    </span>
  );
}
