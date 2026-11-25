import { useId } from "react";

interface KeywordInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  error?: string;
}

export default function KeywordInput({ value, onChange, maxLength = 300, error }: KeywordInputProps) {
  const id = useId();

  return (
    <div>
      <div className="relative">
        <textarea
          aria-label="스크리닝할 상품명"
          aria-describedby={`${id}-count${error ? ` ${id}-error` : ""}`}
          aria-invalid={Boolean(error)}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          maxLength={maxLength}
          placeholder={"캠핑 랜턴\n휴대용 선풍기\n보냉 가방\n..."}
          className={`block h-[210px] w-full resize-none rounded-2xl border bg-white px-[19px] pt-[18px] pb-12 text-sm leading-[17px] font-medium text-black1 placeholder:text-gray1 focus:border-rise focus:outline-none ${error ? "border-rise" : "border-divider"}`}
        />
        <span id={`${id}-count`} className="pointer-events-none absolute right-5 bottom-[19px] text-xs leading-[14px] font-medium text-gray1">
          <span className="sr-only">입력 글자 수 </span>
          {value.length}/{maxLength}
        </span>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs leading-4 text-rise">
          {error}
        </p>
      )}
    </div>
  );
}
