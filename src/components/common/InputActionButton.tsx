import type { ButtonHTMLAttributes, ReactNode } from "react";
import checkIcon from "../../assets/auth/check-off.svg";

/* 입력 필드 우측의 작은 액션 버튼 — '인증번호 받기', '인증하기' 등
   활성 zinc-600 / 비활성 zinc-300 텍스트, 배경은 동일.
   done이면 '인증완료 ✓' 완료 표시(zinc-400, 누를 수 없음) */

interface InputActionButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  children: ReactNode;
  done?: boolean;
}

export default function InputActionButton({ disabled, done = false, children, ...props }: InputActionButtonProps) {
  if (done) {
    return (
      <span className="flex-shrink-0 h-8 pl-2 pr-1 py-1 bg-stone-50 rounded-sm flex items-center gap-0.5 text-sm font-medium text-zinc-400 whitespace-nowrap">
        인증완료
        <img src={checkIcon} alt="" className="w-4 h-4" />
      </span>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      /* 포커스가 풀리면서 입력 상태가 바뀌지 않도록 blur 전에 처리 */
      onMouseDown={(e) => e.preventDefault()}
      className={`flex-shrink-0 h-8 px-2 py-1 bg-stone-50 rounded-sm flex justify-center items-center text-sm font-medium whitespace-nowrap ${
        disabled ? "text-zinc-300" : "text-zinc-600"
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
