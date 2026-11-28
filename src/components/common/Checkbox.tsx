import type { InputHTMLAttributes, ReactNode } from "react";
import checkIcon from "../../assets/auth/check-off.svg";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className" | "children"> {
  children: ReactNode;
}

export default function Checkbox({ children, ...props }: CheckboxProps) {
  return (
    <label className="inline-flex cursor-pointer items-start gap-1 text-xs leading-4 font-medium text-[#656565]">
      <span className="relative size-4 shrink-0">
        <input type="checkbox" className="peer block size-4 cursor-pointer appearance-none rounded-[3px] border border-gray1 bg-white checked:border-[#bd2350] checked:bg-[#bd2350] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy" {...props} />
        <img src={checkIcon} alt="" className="pointer-events-none absolute inset-0 hidden size-4 brightness-0 invert peer-checked:block" />
      </span>
      <span>{children}</span>
    </label>
  );
}
