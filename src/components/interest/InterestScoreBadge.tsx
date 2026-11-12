interface InterestScoreBadgeProps {
  score: number;
  change: number;
}

export default function InterestScoreBadge({ score, change }: InterestScoreBadgeProps) {
  const tone = change > 0 ? "bg-rise-bg text-rise" : change < 0 ? "bg-fall-bg text-fall" : "bg-back text-black2";
  const direction = change > 0 ? "상승" : "하락";

  return (
    <span className={`inline-flex items-center gap-0.5 rounded-sm px-0.5 text-xs font-medium leading-4 ${tone}`}>
      {score}점
      {change !== 0 && (
        <>
          <span className="sr-only">, {Math.abs(change)}점 {direction}</span>
          <span aria-hidden className="inline-flex items-center gap-0.5">
            <span className="text-[10px]">{change > 0 ? "▲" : "▼"}</span>
            {Math.abs(change)}
          </span>
        </>
      )}
    </span>
  );
}
