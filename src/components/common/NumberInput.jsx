import { ChevronUp, ChevronDown } from "lucide-react";

/* 숫자 입력 — 커스텀 스피너(▲▼), 포커스 시 프라이머리 보더 */

export default function NumberInput({ label, value, onChange, step = 100, className = "", ...props }) {
  const num = Number(value) || 0;
  const setNum = (n) => onChange(String(Math.max(n, 0)));

  return (
    <div className={className}>
      {label && <label className="block text-xs text-gray-500 mb-1.5">{label}</label>}
      <div className="relative border border-gray-200 rounded-xl focus-within:border-primary">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full text-sm px-3.5 py-3 pr-9 outline-none bg-transparent placeholder:text-gray-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          {...props}
        />
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex flex-col text-gray-400">
          <button type="button" tabIndex={-1} onClick={() => setNum(num + step)} aria-label="증가">
            <ChevronUp size={12} />
          </button>
          <button type="button" tabIndex={-1} onClick={() => setNum(num - step)} aria-label="감소">
            <ChevronDown size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
