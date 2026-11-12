import type { InterestStatus } from "../../data/interest";

const TABS = [
  { status: "watching", label: "관심중" },
  { status: "selling", label: "판매중" },
] as const;

interface InterestTabsProps {
  status: InterestStatus;
  counts: Record<InterestStatus, number>;
  onChange: (status: InterestStatus) => void;
}

export default function InterestTabs({ status, counts, onChange }: InterestTabsProps) {
  return (
    <div role="group" aria-label="관심상품 상태" className="grid grid-cols-2">
      {TABS.map(({ status: tab, label }) => (
        <button
          key={tab}
          type="button"
          aria-pressed={status === tab}
          onClick={() => onChange(tab)}
          className={`flex h-11 items-center justify-center border-b text-sm ${
            status === tab ? "border-b-2 border-burgundy font-semibold text-primary-dark" : "border-divider text-gray1"
          }`}
        >
          {label} ({counts[tab]})
        </button>
      ))}
    </div>
  );
}
