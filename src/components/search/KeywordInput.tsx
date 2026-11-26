import { useId } from "react";

interface KeywordInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  describedBy?: string;
}

export default function KeywordInput({ value, onChange, maxLength = 300, describedBy }: KeywordInputProps) {
  const id = useId();

  return (
    <div>
      <div className="relative">
        <textarea
          aria-label="스크리닝할 상품명"
          aria-describedby={`${id}-count${describedBy ? ` ${describedBy}` : ""}`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          maxLength={maxLength}
          placeholder={"캠핑 랜턴\n휴대용 선풍기\n보냉 가방\n..."}
          className="block h-[210px] w-full resize-none rounded-2xl border border-divider bg-white px-[19px] pt-[18px] pb-5 text-sm leading-[17px] font-medium text-black1 [scrollbar-color:#cdcdcd_transparent] [scrollbar-width:thin] placeholder:text-gray1 focus:border-rise focus:outline-none"
        />
        <span id={`${id}-count`} className={value ? "sr-only" : "pointer-events-none absolute right-5 bottom-[19px] text-xs leading-[14px] font-medium text-gray1"}>
          <span className="sr-only">입력 글자 수 </span>
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}
