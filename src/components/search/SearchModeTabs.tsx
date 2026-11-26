interface SearchModeTabsProps {
  onUrlAnalysis: () => void;
}

export default function SearchModeTabs({ onUrlAnalysis }: SearchModeTabsProps) {
  return (
    <nav aria-label="검색 방식" className="flex h-[42px] rounded-full bg-back p-1 shadow-[0px_4px_4px_rgba(0,0,0,0.02)]">
      <button
        type="button"
        aria-current="page"
        className="flex flex-1 items-center justify-center rounded-full bg-white text-sm leading-[17px] font-medium text-black1"
      >
        키워드 스크리닝
      </button>
      <button
        type="button"
        onClick={onUrlAnalysis}
        className="flex flex-1 items-center justify-center rounded-full text-sm leading-[17px] text-gray1"
      >
        URL 분석
      </button>
    </nav>
  );
}
