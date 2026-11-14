import { Link, useNavigate } from "react-router";
import backArrow from "../../assets/common/back-arrow.svg";
import { useAuthSession } from "../../auth/AuthSession";

export function ManagementHeader({ title }: { title: string }) {
  return (
    <header className="flex h-12 items-center gap-1 px-4 text-black1">
      <Link to="/mypage" className="-ml-3 grid size-11 shrink-0 place-items-center" aria-label="마이페이지로 돌아가기">
        <img src={backArrow} alt="" className="size-5" />
      </Link>
      <h1 className="text-xl leading-7 font-semibold">{title}</h1>
    </header>
  );
}

export function AccountActions() {
  const { signOut } = useAuthSession();
  const navigate = useNavigate();

  function handleSignOut() {
    signOut();
    navigate("/login", { replace: true });
  }

  return (
    <p className="flex justify-center gap-1 text-xs leading-[14px] font-medium text-gray1">
      <button type="button" onClick={handleSignOut} className="text-neutral-600">로그아웃</button>
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
  describedBy?: string;
  size?: "default" | "small";
}

export function PreferenceSwitch({ checked, onChange, labelledBy, describedBy, size = "default" }: PreferenceSwitchProps) {
  const small = size === "small";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      onClick={() => onChange(!checked)}
      className={`relative shrink-0 rounded-full transition-colors ${
        small ? "h-[18px] w-8 before:absolute before:-inset-y-3 before:-inset-x-1.5" : "h-7 w-[52px] -translate-y-0.5"
      } ${checked ? "bg-primary-dark" : small ? "bg-[#b2b2b2]" : "bg-gray1"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 rounded-full bg-white transition-transform ${
          small ? "size-3.5 shadow-[1px_1px_2px_rgba(0,0,0,0.08)]" : "size-6 shadow-[2px_2px_4px_rgba(0,0,0,0.08)]"
        } ${checked ? (small ? "translate-x-3.5" : "translate-x-6") : ""}`}
      />
    </button>
  );
}
