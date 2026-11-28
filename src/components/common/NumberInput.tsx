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
  variant?: "default" | "compact" | "manual";
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
  const manual = variant === "manual";
  const setNum = (n: number) => {
    const minimum = manual && props.min !== undefined ? Number(props.min) : 0;
    const maximum = manual && props.max !== undefined ? Number(props.max) : Infinity;
    onChange(String(Math.min(maximum, Math.max(n, minimum))));
  };
  const compact = variant === "compact";
  const customStepper = compact || manual;
  const spinnerLabel = manual ? `${props["aria-label"] ?? label ?? "금액"} ` : "";

  return (
    <div className={className}>
      {label && <label className="block text-xs text-gray-500 mb-1.5">{label}</label>}
      <div className={`group relative border ${manual ? `rounded-[10px] border-line focus-within:border-rise ${props["aria-invalid"] === true ? "border-rise" : ""}` : `focus-within:border-primary ${compact ? "rounded-[10px] border-line" : "rounded-xl border-gray-200"}`}`}>
        <input
          type="number"
          value={value}
          step={customStepper ? 1 : undefined}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(event) => {
            onKeyDown?.(event);
            if (customStepper && !event.defaultPrevented && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
              event.preventDefault();
              setNum(num + (event.key === "ArrowUp" ? step : -step));
            }
          }}
          className={`w-full min-w-0 bg-transparent py-3 pr-9 text-sm outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${customStepper ? "h-[41px] pl-4 leading-[17px] font-medium placeholder:text-gray1" : "px-3.5 placeholder:text-gray-300"}`}
          {...props}
        />
        <div className={`absolute top-1/2 -translate-y-1/2 flex-col ${manual ? "hidden group-focus-within:flex" : "flex"} ${customStepper ? "right-4 rounded-sm bg-back text-graytext1" : "right-2.5 text-gray-400"}`}>
          <button type="button" tabIndex={customStepper ? 0 : -1} onClick={() => setNum(num + step)} aria-label={`${spinnerLabel}증가`} className={customStepper ? "flex h-3.5 w-4 items-center justify-center" : undefined}>
            {customStepper ? <span aria-hidden className="border-x-4 border-b-4 border-x-transparent border-b-current" /> : <ChevronUp size={12} />}
          </button>
          <button type="button" tabIndex={customStepper ? 0 : -1} onClick={() => setNum(num - step)} aria-label={`${spinnerLabel}감소`} className={customStepper ? "flex h-3.5 w-4 items-center justify-center" : undefined}>
            {customStepper ? <span aria-hidden className="border-x-4 border-t-4 border-x-transparent border-t-current" /> : <ChevronDown size={12} />}
          </button>
        </div>
      </div>
    </div>
  );
}
