import { Info } from "lucide-react";
import Popover from "../common/Popover";

export default function ScreeningScoreInfo() {
  return (
    <Popover
      trigger={<>종합점수란?<Info size={12} aria-hidden /></>}
      triggerClassName="flex items-center gap-0.5 text-xs leading-4 text-[#858585]"
      className="relative mt-1.5"
      panelClassName="absolute top-full left-0 z-30 mt-3 min-h-24 w-[calc(100%_-_16px)] max-w-[342px] rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.12)]"
    >
      {() => (
        <>
          <span aria-hidden className="absolute -top-2.5 left-5 h-0 w-0 border-x-8 border-b-[10px] border-x-transparent border-b-white" />
          <p role="note" aria-label="종합점수 설명" className="text-xs leading-4 font-normal tracking-[-0.2px] text-[#7d7d7d]">
            종합점수는 검색량·성장세·경쟁강도·쇼핑 반응을 규칙에 따라 합산한<br />
            참고용 지표예요(학습 모델이 아니라 고정 가중치 계산이에요).<br />
            쇼핑 반응은 카드를 펼쳐 분야를 고르면 더해지고,<br />
            고르지 않으면 그 항목을 빼고 나머지로 환산해요.
          </p>
        </>
      )}
    </Popover>
  );
}
