import type { ScreeningResult } from "../../data/screening";
import ScreeningResultSummary from "./ScreeningResultSummary";

interface ScreeningResultCardProps {
  result: ScreeningResult;
  onSelect: () => void;
}

export default function ScreeningResultCard({ result, onSelect }: ScreeningResultCardProps) {
  return (
    <button type="button" onClick={onSelect} className="block w-full rounded-2xl bg-white p-4 text-left text-black1">
      <ScreeningResultSummary result={result} />
    </button>
  );
}
