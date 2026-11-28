import { Info } from "lucide-react";
import Popover from "../common/Popover";

export default function UrlReportInfo() {
  return (
    <Popover
      label="분석 자료 안내"
      trigger={
        <>
          <Info size={14} aria-hidden />
          <span aria-hidden className="pointer-events-none absolute top-full left-1/2 z-40 mt-0.5 hidden h-0 w-0 -translate-x-1/2 border-x-8 border-b-[10px] border-x-transparent border-b-white group-aria-expanded:block" />
        </>
      }
      triggerClassName="group relative flex h-[19px] shrink-0 items-center text-[#868686] before:absolute before:-inset-2"
      className=""
      panelClassName="absolute top-full left-0 z-30 mt-3 w-full max-w-[342px] rounded-2xl bg-white p-4 shadow-[0_4px_14px_rgba(0,0,0,0.16)]"
    >
      {() => (
        <p role="note" aria-label="분석 자료 설명" className="text-xs leading-[18px] font-normal tracking-[-0.2px] text-[#7d7d7d]">
          종합점수(0~100)와 투자 등급까지 한 번에 나와요.<br />
          (등급 = 적합/조건부 적합/비추천)<br />
          도매매·오너클랜은 전체 4단계,<br />
          그 외 사이트는 직접 입력으로 2~4단계 + 수익성을 제공해요.
        </p>
      )}
    </Popover>
  );
}
