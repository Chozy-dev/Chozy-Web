import { useId, useState, type FormEvent } from "react";
import { KEYWORD_CHARACTER_LIMIT, KEYWORD_COUNT_LIMIT, normalizeKeywords } from "../../lib/keywordScreening";
import KeywordInput from "./KeywordInput";
import SearchSubmitButton from "./SearchSubmitButton";

interface KeywordScreeningFormProps {
  onScreen: (keywords: string[]) => void;
  initialValue?: string;
}

export default function KeywordScreeningForm({ onScreen, initialValue = "" }: KeywordScreeningFormProps) {
  const id = useId();
  const [value, setValue] = useState(initialValue);
  const keywords = normalizeKeywords(value);
  const excludedCount = Math.max(0, keywords.length - KEYWORD_COUNT_LIMIT);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!keywords.length) return;
    setValue(keywords.join("\n"));
    onScreen(keywords.slice(0, KEYWORD_COUNT_LIMIT));
  }

  return (
    <form onSubmit={handleSubmit} aria-labelledby="keyword-screening-title">
      <h2 id="keyword-screening-title" className="text-lg leading-5 font-semibold text-[#191919]">
        판매 예정인 상품명을 입력해주세요.
      </h2>
      <p className="mt-1.5 text-xs leading-[14px] text-graytext1">
        키워드를 한 줄에 하나씩, 최대 {KEYWORD_COUNT_LIMIT}개까지 입력하거나 붙여넣으세요.
      </p>

      <div className="mt-4">
        <KeywordInput
          value={value}
          onChange={setValue}
          maxLength={KEYWORD_CHARACTER_LIMIT}
          describedBy={`${id}-help ${id}-count${excludedCount ? ` ${id}-warning` : ""}`}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-x-1 gap-y-1 text-xs leading-[14px]">
        <p id={`${id}-help`} className="tracking-[-0.2px] text-graytext1">
          중복 키워드는 자동으로 합쳐지고, 앞뒤 공백은 제거돼요
        </p>
        <span id={`${id}-count`} aria-live="polite" className={`ml-auto shrink-0 ${keywords.length ? "text-rise" : "text-graytext1"}`}>
          최대 {KEYWORD_COUNT_LIMIT}개·현재 {keywords.length}개
        </span>
      </div>
      {excludedCount > 0 && (
        <p id={`${id}-warning`} role="status" className="mt-2 text-xs font-semibold text-rise">
          {KEYWORD_COUNT_LIMIT}개까지만 처리돼요, {excludedCount}개는 제외돼요
        </p>
      )}

      <SearchSubmitButton disabled={!keywords.length} className="mt-4" />
    </form>
  );
}
