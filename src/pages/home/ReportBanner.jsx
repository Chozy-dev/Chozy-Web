/* 무료 리포트 배너 — variant: "used"(1/1 사용) | "available"(1회 사용 가능) */

const TITLES = {
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

export default function ReportBanner({ variant = "used", onSubscribe }) {
  return (
    <section className="mx-3 mb-2.5">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#c9285b] to-primary-dark p-4.5 text-white">
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
