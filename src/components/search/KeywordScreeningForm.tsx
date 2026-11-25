import { useState, type FormEvent } from "react";
import { Upload } from "lucide-react";
import { KEYWORD_CHARACTER_LIMIT, KEYWORD_COUNT_LIMIT, normalizeKeywords } from "../../lib/keywordScreening";
import KeywordInput from "./KeywordInput";

interface KeywordScreeningFormProps {
  onScreen: (keywords: string[]) => void;
  onUpload: () => void;
}

export default function KeywordScreeningForm({ onScreen, onUpload }: KeywordScreeningFormProps) {
  const [value, setValue] = useState("");
  const keywords = normalizeKeywords(value);
  const error = keywords.length > KEYWORD_COUNT_LIMIT
    ? `키워드는 최대 ${KEYWORD_COUNT_LIMIT}개까지 입력할 수 있어요.`
    : undefined;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!keywords.length || error) return;
    setValue(keywords.join("\n"));
    onScreen(keywords);
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
        <KeywordInput value={value} onChange={setValue} maxLength={KEYWORD_CHARACTER_LIMIT} error={error} />
      </div>

      <button
        type="button"
        onClick={onUpload}
        className="mt-3 flex h-10 w-full items-center justify-center gap-px rounded-xl bg-[#fff4f7] text-xs leading-[14px] font-semibold text-gray1"
      >
        <Upload size={20} strokeWidth={1.5} aria-hidden />
        엑셀/CSV로 업로드
      </button>

      <p className="mt-3 text-xs leading-[14px] text-graytext1">
        중복 키워드는 자동으로 합쳐지고, 앞뒤 공백은 제거돼요.
      </p>

      <button
        type="submit"
        disabled={!keywords.length || Boolean(error)}
        className="mt-6 flex h-[45px] w-full items-center justify-center rounded-xl bg-burgundy px-3 text-xs leading-[14px] font-medium text-white shadow-[0px_4px_6px_rgba(0,0,0,0.12)] disabled:bg-[#dadada]"
      >
        스크리닝 시작 →
      </button>
    </form>
  );
}
