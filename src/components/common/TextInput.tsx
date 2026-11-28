import type { InputHTMLAttributes } from "react";

/* 텍스트 입력 — 포커스 시 프라이머리 보더 */

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className"> {
  label?: string;
  type?: "text" | "url";
  variant?: "default" | "search" | "manual";
  className?: string;
}

export default function TextInput({ label, type = "text", variant = "default", className = "", ...props }: TextInputProps) {
  return (
    <div className={className}>
      {label && <label className="block text-xs text-gray-500 mb-1.5">{label}</label>}
      <input
        type={type}
        className={`w-full border py-3 text-sm outline-none ${variant === "manual" ? "h-[43px] rounded-[10px] border-line px-4 leading-[17px] font-medium text-black1 placeholder:text-gray1 focus:border-rise aria-invalid:border-rise" : `rounded-xl focus:border-primary ${variant === "search" ? "h-[45px] border-divider px-[19px] leading-[17px] font-medium text-black1 placeholder:text-gray1" : "border-gray-200 px-3.5 placeholder:text-gray-300"}`}`}
        {...props}
      />
    </div>
  );
}
