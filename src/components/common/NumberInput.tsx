import type { InputHTMLAttributes } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

/* 숫자 입력 — 커스텀 스피너(▲▼), 포커스 시 프라이머리 보더 */

interface NumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange" | "step" | "className"> {
  label?: string;
  /** 빈 문자열을 허용하기 위해 문자열로 다룹니다 */
  value: string;
  onChange: (value: string) => void;
  /** 스피너 클릭 시 증감 폭 */
  step?: number;
  variant?: "default" | "compact";
  className?: string;
}

export default function NumberInput({
  label,
  value,
  onChange,
  step = 100,
  variant = "default",
  className = "",
  onKeyDown,
  ...props
}: NumberInputProps) {
  const num = Number(value) || 0;
  const setNum = (n: number) => onChange(String(Math.max(n, 0)));
  const compact = variant === "compact";

  return (
    <div className={className}>
      {label && <label className="block text-xs text-gray-500 mb-1.5">{label}</label>}
      <div className={`relative border focus-within:border-primary ${compact ? "rounded-[10px] border-line" : "rounded-xl border-gray-200"}`}>
        <input
          type="number"
          value={value}
          step={compact ? 1 : undefined}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(event) => {
            onKeyDown?.(event);
            if (compact && !event.defaultPrevented && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
              event.preventDefault();
              setNum(num + (event.key === "ArrowUp" ? step : -step));
            }
          }}
          className={`w-full min-w-0 bg-transparent py-3 pr-9 text-sm outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${compact ? "h-[41px] pl-4 leading-[17px] font-medium placeholder:text-gray1" : "px-3.5 placeholder:text-gray-300"}`}
          {...props}
        />
        <div className={`absolute top-1/2 flex -translate-y-1/2 flex-col ${compact ? "right-4 rounded-sm bg-back text-graytext1" : "right-2.5 text-gray-400"}`}>
          <button type="button" tabIndex={compact ? 0 : -1} onClick={() => setNum(num + step)} aria-label="증가" className={compact ? "flex h-3.5 w-4 items-center justify-center" : undefined}>
            {compact ? <span aria-hidden className="border-x-4 border-b-4 border-x-transparent border-b-current" /> : <ChevronUp size={12} />}
          </button>
          <button type="button" tabIndex={compact ? 0 : -1} onClick={() => setNum(num - step)} aria-label="감소" className={compact ? "flex h-3.5 w-4 items-center justify-center" : undefined}>
            {compact ? <span aria-hidden className="border-x-4 border-t-4 border-x-transparent border-t-current" /> : <ChevronDown size={12} />}
          </button>
        </div>
      </div>
    </div>
  );
}
