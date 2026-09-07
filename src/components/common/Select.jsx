import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

/* 셀렉트 — 열림 시 프라이머리 보더, 선택 항목 체크(✓)+볼드 드롭다운
   options: [{ value, label }] */

export default function Select({ value, options, onChange, placeholder, disabled = false, className = "" }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
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

      {open && (
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
                  {isSelected ? <Check size={14} className="text-primary flex-shrink-0" /> : <span className="w-3.5 flex-shrink-0" />}
                  <span className={isSelected ? "font-semibold text-gray-900" : "text-gray-400"}>{o.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
