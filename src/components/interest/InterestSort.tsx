import { ArrowDownUp } from "lucide-react";
import InterestPopover from "./InterestPopover";

const SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "score", label: "점수순" },
  { value: "change", label: "변동순" },
] as const;

export type InterestSortOrder = (typeof SORT_OPTIONS)[number]["value"];

interface InterestSortProps {
  value: InterestSortOrder;
  onChange: (value: InterestSortOrder) => void;
}

export default function InterestSort({ value, onChange }: InterestSortProps) {
  const selected = SORT_OPTIONS.find((option) => option.value === value);

  return (
    <InterestPopover
      trigger={<>{selected?.label}<ArrowDownUp size={12} aria-hidden /></>}
      triggerClassName="flex min-h-9 items-center gap-1 text-sm font-medium text-graytext1"
    >
      {(close) => (
        <ul className="space-y-0.5">
          {SORT_OPTIONS.map(({ value: order, label }) => (
            <li key={order}>
              <button
                type="button"
                aria-pressed={value === order}
                className={`block w-full rounded-xl px-2 py-1.5 text-left text-xs font-medium hover:bg-back focus-visible:bg-back ${value === order ? "bg-back" : ""}`}
                onClick={() => {
                  onChange(order);
                  close();
                }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </InterestPopover>
  );
}
