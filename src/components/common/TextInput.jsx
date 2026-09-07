/* 텍스트 입력 — 포커스 시 프라이머리 보더 */

export default function TextInput({ label, className = "", ...props }) {
  return (
    <div className={className}>
      {label && <label className="block text-xs text-gray-500 mb-1.5">{label}</label>}
      <input
        type="text"
        className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-3 outline-none placeholder:text-gray-300 focus:border-primary"
        {...props}
      />
    </div>
  );
}
