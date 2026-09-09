import { useState, type InputHTMLAttributes } from "react";

/* 라벨 + 밑줄 입력 — 로그인·회원가입 공용
   기본 밑줄은 zinc-400, 포커스 시 프라이머리 */

interface InputBoxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  className?: string;
}

export default function InputBox({ label, className = "", onFocus, onBlur, ...props }: InputBoxProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`h-16 flex flex-col justify-start items-start ${className}`}>
      <label className="text-sm font-medium text-neutral-500">{label}</label>
      <div
        className={`self-stretch h-11 px-1 py-3 border-b flex justify-start items-center gap-3 ${
          focused ? "border-primary-dark" : "border-zinc-400"
        }`}
      >
        <input
          className="flex-1 min-w-0 bg-transparent outline-none text-base font-medium text-black1 placeholder:text-zinc-400 placeholder:font-medium"
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />
      </div>
    </div>
  );
}
