import { TONE } from "../../lib/score";

export default function Badge({ tone, children }) {
  const t = TONE[tone];
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium ${t.bg} ${t.text}`}>
      {children}
    </span>
  );
}
