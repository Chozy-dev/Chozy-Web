import type { ButtonHTMLAttributes, ReactNode } from "react";

/* 로그인·회원가입 등 인증 화면의 전체 너비 버튼
   primary   : 활성 시 프라이머리, 비활성 시 회색
   secondary : 연한 회색 배경 */

export type AuthButtonVariant = "primary" | "secondary";

interface AuthButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  variant?: AuthButtonVariant;
  children: ReactNode;
}

export default function AuthButton({ variant = "primary", disabled, children, ...props }: AuthButtonProps) {
  const style =
    variant === "secondary"
      ? "bg-stone-50 text-zinc-600"
      : disabled
        ? "bg-zinc-300 text-white"
        : "bg-primary-dark text-white";

  return (
    <button
      type="button"
      disabled={disabled}
      className={`self-stretch h-12 px-4 py-2.5 rounded-xl flex justify-center items-center text-base font-medium ${style}`}
      {...props}
    >
      {children}
    </button>
  );
}
