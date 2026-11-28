import { useId, useState, type FormEvent } from "react";
import TextInput from "../common/TextInput";
import SearchSubmitButton from "./SearchSubmitButton";
import { normalizeProductUrl } from "../../lib/productUrl";

interface UrlAnalysisFormProps {
  description: string;
  onAnalyze: (url: string) => void;
  onManualInput: () => void;
}

export default function UrlAnalysisForm({ description, onAnalyze, onManualInput }: UrlAnalysisFormProps) {
  const id = useId();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!value.trim()) return;
    const url = normalizeProductUrl(value);
    if (!url) {
      setError("http:// 또는 https://로 시작하는 상품 URL을 입력해주세요.");
      return;
    }
    setError("");
    setValue(url);
    onAnalyze(url);
  }

  return (
    <form noValidate onSubmit={handleSubmit} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="text-lg leading-5 font-semibold text-[#1a1a1a]">도매매·오너클랜 상품 링크를 붙여넣으세요.</h2>
      <p id={`${id}-description`} className="mt-1.5 text-xs leading-[14px] font-medium text-graytext1">{description}</p>
      <TextInput
        type="url"
        variant="search"
        aria-label="상품 페이지 URL"
        aria-describedby={`${id}-description${error ? ` ${id}-error` : ""}`}
        aria-invalid={Boolean(error)}
        placeholder="상품 페이지 URL을 붙여넣으세요"
        autoComplete="url"
        autoCapitalize="none"
        spellCheck={false}
        value={value}
        onChange={(event) => { setValue(event.target.value); setError(""); }}
        className="mt-4"
      />
      {error && <p id={`${id}-error`} role="alert" className="mt-2 text-xs font-semibold text-rise">{error}</p>}
      <SearchSubmitButton disabled={!value.trim()} className="mt-3" />
      <div className="mt-6 flex justify-center text-center">
        <button type="button" onClick={onManualInput} className="text-xs leading-[14px] font-medium text-[#868686] underline">
          URL이 없거나 지원하지 않는 사이트인가요? <strong className="font-bold">직접입력하기</strong>
        </button>
      </div>
    </form>
  );
}
