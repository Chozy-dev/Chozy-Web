import { Check, X } from "lucide-react";

export default function ManualAnalysisScope() {
  return (
    <section aria-label="직접 입력 분석의 범위" className="rounded-2xl border border-divider bg-white p-[15px]">
      <h3 className="text-sm leading-[17px] font-medium">직접 입력 분석의 범위</h3>
      <ul className="mt-2.5 space-y-2 text-xs leading-4 font-medium tracking-[-0.3px]">
        <li className="flex items-start gap-2">
          <Check size={16} aria-hidden className="shrink-0 text-[#009b5d]" />
          <span className="text-[#868686]">수익성 · 시장 트렌드 · 경쟁강도 · 판매전략 · 광고비 시뮬레이션</span>
        </li>
        <li className="flex items-start gap-2">
          <X size={16} aria-hidden className="shrink-0 text-rise" />
          <span className="text-[#5e5e5e]">공급 안정성 · 공급사 신뢰도 — 이 사이트는 재고·품절이력·공급사 평판 데이터를 제공하지 않아서 확인할 수 없어요</span>
        </li>
      </ul>
    </section>
  );
}
