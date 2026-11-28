export default function SearchSubmitButton({ disabled, className = "" }: { disabled: boolean; className?: string }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`flex h-[45px] w-full items-center justify-center rounded-xl bg-burgundy px-3 text-xs leading-[14px] font-medium text-white shadow-[0px_4px_6px_rgba(0,0,0,0.12)] disabled:bg-[#dadada] ${className}`}
    >
      스크리닝 시작 →
    </button>
  );
}
