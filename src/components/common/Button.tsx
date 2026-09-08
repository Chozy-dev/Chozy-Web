import type { ButtonHTMLAttributes, ReactNode } from "react";

/* 버튼 — primary(버건디) / outline(흰 배경 보더) / disabled(회색) */

export type ButtonVariant = "primary" | "outline" | "disabled";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-primary-dark text-white",
  outline: "bg-white border border-gray-200 text-gray-800",
  disabled: "bg-gray-200 text-gray-400",
};

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export default function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  return (
    <button
      disabled={variant === "disabled"}
      className={`w-full text-sm font-semibold rounded-xl py-3.5 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
