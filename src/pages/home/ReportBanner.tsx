import type { ReactNode } from "react";

/* 무료 리포트 배너 — variant: "used"(1/1 사용) | "available"(1회 사용 가능) */

export type ReportBannerVariant = "used" | "available";

const TITLES: Record<ReportBannerVariant, ReactNode> = {
  used: (
    <>
      이번 달
      <br />
      무료 리포트 1/1 사용
    </>
  ),
  available: (
    <>
      이번 달
      <br />
      무료 리포트 1회 사용 가능
    </>
  ),
};

interface ReportBannerProps {
  variant?: ReportBannerVariant;
  onSubscribe?: () => void;
}

export default function ReportBanner({ variant = "used", onSubscribe }: ReportBannerProps) {
  return (
    <section className="mx-5 mb-3">
      <div className="relative overflow-hidden rounded-[18px] bg-[linear-gradient(90deg,#ff4c80_0%,#861b3a_100%)] p-5 text-white">
        <p className="text-[17px] font-bold leading-snug mb-1">{TITLES[variant]}</p>
        <p className="text-xs text-white/70 mb-4">매달 1개의 무료 리포트를 받을 수 있어요</p>
        <button onClick={onSubscribe} className="text-xs font-semibold">
          구독하러 가기 ›
        </button>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-5xl -rotate-12" aria-hidden>
          📢
        </span>
      </div>
    </section>
  );
}
