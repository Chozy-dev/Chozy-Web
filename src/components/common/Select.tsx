import { useEffect, useId, useRef, useState } from "react";
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
  compact?: boolean;
  labelledBy?: string;
  className?: string;
}

export default function Select<T extends string>({
  value,
  options,
  onChange,
  placeholder,
  disabled = false,
  variant = "check",
  compact = false,
  labelledBy,
  className = "",
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const valueId = useId();
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  const selected = options.find((o) => o.value === value);

  function closeAndFocusTrigger() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <div
      ref={rootRef}
      className={`relative ${className}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (open && event.key === "Escape") {
          event.preventDefault();
          closeAndFocusTrigger();
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-labelledby={labelledBy ? `${labelledBy} ${valueId}` : undefined}
        onClick={() => setOpen((v) => !v)}
        className={`w-full bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] focus-visible:outline-primary flex justify-between items-center text-left ${
          compact ? "min-h-[30px] gap-1 px-2 py-1.5 outline-line" : `gap-2.5 p-3 ${open ? "outline-primary" : "outline-line"}`
        }`}
      >
        <span
          id={valueId}
          className={`truncate font-medium ${compact ? "text-xs leading-[14px]" : "pl-1 text-sm"} ${
            disabled ? "text-gray-300" : compact ? "text-neutral-600" : "text-black1"
          }`}
        >
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={compact ? 14 : 16}
          className={`shrink-0 ${disabled ? "text-gray-300" : compact ? "text-graytext1" : "text-black2"}`}
          aria-hidden
        />
      </button>

      {open &&
        (variant === "highlight" ? (
          <ul id={menuId} className={`absolute z-20 right-0 p-2.5 bg-white rounded-2xl shadow-[0px_4px_10px_0px_rgba(0,0,0,0.08),0px_-4px_10px_0px_rgba(0,0,0,0.08)] flex flex-col gap-1 ${
            compact ? "mt-1 w-[155px]" : "left-0 mt-1.5"
          }`}>
            {options.map((o) => (
              <li key={o.value} className="self-stretch">
                <button
                  type="button"
                  aria-pressed={o.value === value}
                  onClick={() => {
                    onChange(o.value);
                    closeAndFocusTrigger();
                  }}
                  className={`w-full px-2 py-1.5 rounded-lg flex justify-start items-center text-left text-xs font-medium ${
                    compact ? "leading-[14px] text-neutral-600 hover:bg-back" : "text-black1 hover:bg-line"
                  } ${
                    o.value === value ? (compact ? "bg-back" : "bg-line") : "bg-white"
                  }`}
                >
                  {o.label}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ul id={menuId} className="absolute z-20 left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-lg py-1.5 max-h-64 overflow-y-auto">
            {options.map((o) => {
              const isSelected = o.value === value;
              return (
                <li key={o.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(o.value);
                      closeAndFocusTrigger();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-sm"
                  >
                    {isSelected ? (
                      <Check size={14} className="text-primary flex-shrink-0" />
                    ) : (
                      <span className="w-3.5 flex-shrink-0" />
                    )}
                    <span
                      className={
                        isSelected
                          ? "font-semibold text-gray-900"
                          : "text-gray-400"
                      }
                    >
                      {o.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        ))}
    </div>
  );
}
