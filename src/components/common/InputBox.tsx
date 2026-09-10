import { useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff, X } from "lucide-react";

/* 라벨 + 밑줄 입력 — 로그인·회원가입 공용
   포커스 시 밑줄이 프라이머리로 바뀌고 플레이스홀더는 감춰지며,
   값이 있으면 지우기 버튼(비밀번호는 표시 토글까지) 노출 */

type NativeProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "value" | "onChange" | "type">;

interface InputBoxProps extends NativeProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "password";
  className?: string;
}

export default function InputBox({
  label,
  value,
  onChange,
  type = "text",
  className = "",
  placeholder,
  onFocus,
  onBlur,
  ...props
}: InputBoxProps) {
  const [focused, setFocused] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const hasValue = value.length > 0;
  const isPassword = type === "password";

  return (
    <div className={`h-16 flex flex-col justify-start items-start ${className}`}>
      <label className="text-sm font-medium text-neutral-500">{label}</label>
      <div
        className={`self-stretch h-11 px-1 py-3 border-b flex justify-start items-center gap-3 ${
          focused ? "border-primary-dark" : "border-zinc-400"
        }`}
      >
        <input
          type={isPassword && !revealed ? "password" : "text"}
          value={value}
          /* 포커스되면 플레이스홀더를 감추고 커서만 보이게 */
          placeholder={focused ? "" : placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 min-w-0 bg-transparent outline-none caret-primary-dark text-base font-medium text-black1 placeholder:text-zinc-400 placeholder:font-medium"
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

        {hasValue && isPassword && (
          <button
            type="button"
            /* 포커스가 풀리면서 버튼이 사라지지 않도록 blur 전에 처리 */
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setRevealed((v) => !v)}
            aria-label={revealed ? "비밀번호 숨기기" : "비밀번호 표시"}
            className="flex-shrink-0 text-gray3"
          >
            {revealed ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}

        {hasValue && (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onChange("")}
            aria-label={`${label} 지우기`}
            className="flex-shrink-0 w-5 h-5 rounded-full bg-gray3 flex items-center justify-center"
          >
            <X size={12} strokeWidth={3} className="text-white" />
          </button>
        )}
      </div>
    </div>
  );
}
