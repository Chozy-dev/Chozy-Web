import { useId } from "react";
import NumberInput from "../common/NumberInput";
import type { CompetitionFilter } from "../../data/screening";

const COMPETITION_OPTIONS: { value: CompetitionFilter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "medium-or-lower", label: "보통이하" },
  { value: "low", label: "낮음만" },
];

interface ScreeningFiltersProps {
  minimumVolume: string;
  onMinimumVolumeChange: (value: string) => void;
  competition: CompetitionFilter;
  onCompetitionChange: (value: CompetitionFilter) => void;
}

export default function ScreeningFilters({ minimumVolume, onMinimumVolumeChange, competition, onCompetitionChange }: ScreeningFiltersProps) {
  const id = useId();

  function updateMinimumVolume(value: string) {
    const number = Number(value);
    onMinimumVolumeChange(value === "" || !Number.isFinite(number)
      ? ""
      : String(Math.min(Number.MAX_SAFE_INTEGER, Math.max(0, Math.floor(number)))));
  }

  return (
    <section aria-label="결과 필터" className="rounded-2xl bg-white p-4">
      <div className="grid grid-cols-[70px_minmax(0,1fr)_21px] items-center">
        <label htmlFor={`${id}-minimum`} className="text-xs leading-[14px] font-medium text-[#868686]">최소 검색량</label>
        <NumberInput
          id={`${id}-minimum`}
          value={minimumVolume}
          onChange={updateMinimumVolume}
          variant="compact"
          step={100}
          min={0}
          max={Number.MAX_SAFE_INTEGER}
          placeholder="제한 없음"
          inputMode="numeric"
          className="min-w-0"
        />
        <span className="pl-2 text-sm leading-[17px] font-medium text-[#868686]">회</span>
      </div>
      <div className="mt-4 grid grid-cols-[70px_minmax(0,1fr)_21px] items-center">
        <span id={`${id}-competition`} className="text-xs leading-[14px] font-medium text-[#868686]">경쟁강도</span>
        <div role="group" aria-labelledby={`${id}-competition`} className="flex gap-[5px]">
          {COMPETITION_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={competition === option.value}
              onClick={() => onCompetitionChange(option.value)}
              className={`flex min-h-[30px] min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-md px-1 py-2 text-xs leading-[14px] font-semibold ${competition === option.value ? "bg-burgundy text-white" : `bg-back ${option.value === "low" ? "text-gray1" : "text-[#858585]"}`}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
