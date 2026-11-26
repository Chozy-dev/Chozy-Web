import type { ScreeningSort as SortOrder } from "../../data/screening";

const OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "upload", label: "업로드 순서" },
  { value: "score", label: "종합점수순" },
  { value: "volume", label: "검색량순" },
  { value: "competition", label: "경쟁강도순" },
];

interface ScreeningSortProps {
  value: SortOrder;
  onChange: (value: SortOrder) => void;
}

export default function ScreeningSort({ value, onChange }: ScreeningSortProps) {
  return (
    <div role="group" aria-label="결과 정렬" className="flex flex-wrap gap-1.5">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={`rounded-full px-3 py-2 text-xs leading-[14px] font-semibold ${value === option.value ? "bg-burgundy text-white" : "bg-white text-[#858585]"}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
