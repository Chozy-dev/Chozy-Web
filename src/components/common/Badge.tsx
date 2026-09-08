import type { ReactNode } from "react";
import { TONE, type Tone } from "../../lib/score";

interface BadgeProps {
  tone: Tone;
  children: ReactNode;
}

export default function Badge({ tone, children }: BadgeProps) {
  const t = TONE[tone];
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium ${t.bg} ${t.text}`}>
      {children}
    </span>
  );
}
