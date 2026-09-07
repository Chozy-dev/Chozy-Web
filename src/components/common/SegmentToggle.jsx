/* 세그먼트 토글 — 활성 항목 흰 필 + 그림자 (예: 키워드/상품) */

export default function SegmentToggle({ options, value, onChange }) {
  return (
    <div className="flex bg-gray-100 rounded-full p-0.5">
      {options.map((o) => (
        <button
          key={o.k}
          onClick={() => onChange(o.k)}
          className={`text-xs rounded-full px-3 py-1 ${
            value === o.k ? "bg-white text-gray-900 font-semibold shadow-sm" : "text-gray-400"
          }`}
        >
          {o.l}
        </button>
      ))}
    </div>
  );
}
