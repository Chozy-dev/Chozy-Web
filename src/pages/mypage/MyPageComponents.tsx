import { Link } from "react-router";

export function AccountActions() {
  return (
    <p className="flex justify-center gap-1 text-xs leading-[14px] font-medium text-gray1">
      <Link to="/login" replace className="text-neutral-600">로그아웃</Link>
      <span aria-hidden>|</span>
      <button type="button" disabled>회원탈퇴</button>
    </p>
  );
}

export function PlanBadge({ plan }: { plan: "Free" | "Premium" }) {
  const color = plan === "Premium"
    ? "bg-linear-to-r from-primary-dark via-[#a64863] to-burgundy text-white"
    : "bg-back text-black2";

  return (
    <span className={`inline-flex rounded-full px-1.5 py-1 text-[8px] leading-[9px] font-semibold ${color}`}>
      {plan}
    </span>
  );
}

export function UsageProgress({ used, limit }: { used: number; limit: number }) {
  return (
    <div
      role="progressbar"
      aria-label="비용투자 적합도 이용량"
      aria-valuemin={0}
      aria-valuemax={limit}
      aria-valuenow={used}
      className="h-1.5 overflow-hidden rounded-full bg-white shadow-[0_4px_4px_rgba(0,0,0,0.01)]"
    >
      <div className="h-full rounded-full bg-burgundy" style={{ width: `${used / limit * 100}%` }} />
    </div>
  );
}

interface PreferenceSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  labelledBy: string;
  describedBy: string;
}

export function PreferenceSwitch({ checked, onChange, labelledBy, describedBy }: PreferenceSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-[52px] shrink-0 -translate-y-0.5 rounded-full transition-colors ${checked ? "bg-primary-dark" : "bg-gray1"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 size-6 rounded-full bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.08)] transition-transform ${checked ? "translate-x-6" : ""}`}
      />
    </button>
  );
}
