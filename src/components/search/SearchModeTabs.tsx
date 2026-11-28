export type SearchMode = "keyword" | "url";

interface SearchModeTabsProps {
  value: SearchMode;
  onChange: (mode: SearchMode) => void;
}

const MODES: { value: SearchMode; label: string }[] = [{ value: "keyword", label: "키워드 스크리닝" }, { value: "url", label: "URL 분석" }];

export default function SearchModeTabs({ value, onChange }: SearchModeTabsProps) {
  return (
    <nav aria-label="검색 방식" className="flex h-[42px] rounded-full bg-back p-1 shadow-[0px_4px_4px_rgba(0,0,0,0.02)]">
      {MODES.map((mode) => (
        <button
          key={mode.value}
          type="button"
          aria-current={mode.value === value ? "page" : undefined}
          onClick={() => { if (mode.value !== value) onChange(mode.value); }}
          className={`flex flex-1 items-center justify-center rounded-full text-sm leading-[17px] ${mode.value === value ? "bg-white font-medium text-black1" : "font-normal text-gray1"}`}
        >
          {mode.label}
        </button>
      ))}
    </nav>
  );
}
