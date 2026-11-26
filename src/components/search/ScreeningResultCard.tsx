import { COMPETITION_LABELS, type ScreeningBadgeTone, type ScreeningResult } from "../../data/screening";

const BADGE_TONES: Record<ScreeningBadgeTone, string> = {
  red: "bg-[#ffe6ec] text-rise",
  yellow: "bg-[#fffbe8] text-[#daaa28]",
};

function ScreeningBadge({ label, tone }: { label: string; tone: ScreeningBadgeTone }) {
  return (
    <span className={`inline-flex min-h-[21px] min-w-10 shrink-0 items-center justify-center rounded-full px-2 py-[5px] text-[9.23px] leading-[11px] font-semibold ${BADGE_TONES[tone]}`}>
      {label}
    </span>
  );
}

interface ScreeningResultCardProps {
  result: ScreeningResult;
  onSelect: () => void;
}

export default function ScreeningResultCard({ result, onSelect }: ScreeningResultCardProps) {
  return (
    <button type="button" onClick={onSelect} className="block w-full rounded-2xl bg-white p-4 text-left text-black1">
      <div className="flex items-center justify-between gap-3">
        <h2 className="min-w-0 break-words text-sm leading-[17px] font-medium">{result.keyword}</h2>
        <ScreeningBadge label={`${result.score}점`} tone={result.scoreTone} />
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-x-8 gap-y-1 text-xs leading-[14px]">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-graytext1">검색량</span>
          <span className="font-semibold">{result.searchVolume.toLocaleString("ko-KR")}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-graytext1">경쟁강도</span>
          <ScreeningBadge label={COMPETITION_LABELS[result.competition]} tone={result.competitionTone} />
        </div>
      </div>
    </button>
  );
}
