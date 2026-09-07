import { useState } from "react";
import { CHANGE_FILTER_OPTIONS } from "../../data/home";

export default function ChangeFilterModal({ open, onClose }) {
  const [selected, setSelected] = useState(CHANGE_FILTER_OPTIONS);
  if (!open) return null;

  const toggle = (option) =>
    setSelected((prev) => (prev.includes(option) ? prev.filter((x) => x !== option) : [...prev, option]));

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="w-full max-w-md bg-white rounded-t-2xl p-4" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm font-semibold text-stone-900 mb-3">확인할 변동 사항을 선택해 주세요</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {CHANGE_FILTER_OPTIONS.map((option) => {
            const on = selected.includes(option);
            return (
              <button
                key={option}
                onClick={() => toggle(option)}
                className={`text-xs rounded-full px-2.5 py-1.5 ${on ? "bg-primary text-white" : "bg-stone-100 text-stone-500"}`}
              >
                {option}
              </button>
            );
          })}
        </div>
        <button onClick={onClose} className="w-full bg-primary text-white text-sm font-medium rounded-lg py-2.5">
          저장
        </button>
      </div>
    </div>
  );
}
