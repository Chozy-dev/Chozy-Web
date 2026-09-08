import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

/* 셀렉트 — 열림 시 프라이머리 보더
   값 타입을 제네릭으로 받아 옵션·onChange가 같은 유니언으로 묶이도록 합니다.

   드롭다운 스타일 두 가지 (Figma 스펙):
   - check     : 선택 항목에 체크(✓) + 볼드 (마진 계산기 판매 채널)
   - highlight : 선택·호버 항목에 회색 배경 칩 (카테고리 선택) */

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

export type SelectVariant = "check" | "highlight";

interface SelectProps<T extends string> {
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
  variant?: SelectVariant;
  className?: string;
}

export default function Select<T extends string>({
  value,
  options,
  onChange,
  placeholder,
  disabled = false,
  variant = "check",
  className = "",
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between text-sm border rounded-xl px-3.5 py-3 bg-white text-left ${
          open ? "border-primary" : "border-gray-200"
        } ${disabled ? "text-gray-300" : "text-gray-800"}`}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <ChevronDown size={16} className={`flex-shrink-0 ml-1 ${disabled ? "text-gray-300" : "text-gray-500"}`} />
      </button>

      {open &&
        (variant === "highlight" ? (
          <ul className="absolute z-20 left-0 right-0 mt-1.5 p-2.5 bg-white rounded-2xl shadow-[0px_4px_10px_0px_rgba(0,0,0,0.08),0px_-4px_10px_0px_rgba(0,0,0,0.08)] max-h-64 overflow-y-auto flex flex-col gap-1">
            {options.map((o) => (
              <li key={o.value} className="self-stretch">
                <button
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`w-full px-2 py-1.5 rounded-lg flex justify-start items-center text-left text-black text-xs font-medium hover:bg-gray-100 ${
                    o.value === value ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  {o.label}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="absolute z-20 left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-lg py-1.5 max-h-64 overflow-y-auto">
            {options.map((o) => {
              const isSelected = o.value === value;
              return (
                <li key={o.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(o.value);
                      setOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-sm"
                  >
                    {isSelected ? (
                      <Check size={14} className="text-primary flex-shrink-0" />
                    ) : (
                      <span className="w-3.5 flex-shrink-0" />
                    )}
                    <span className={isSelected ? "font-semibold text-gray-900" : "text-gray-400"}>{o.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        ))}
    </div>
  );
}
