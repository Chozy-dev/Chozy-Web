/* 버튼 — primary(버건디) / outline(흰 배경 보더) / disabled(회색) */

const VARIANTS = {
  primary: "bg-primary-dark text-white",
  outline: "bg-white border border-gray-200 text-gray-800",
  disabled: "bg-gray-200 text-gray-400",
};

export default function Button({ variant = "primary", children, className = "", ...props }) {
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
