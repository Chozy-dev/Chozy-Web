import { Info } from "lucide-react";
import { URL_REPORT_SECTIONS } from "../../data/urlAnalysis";

export default function UrlReportPreview({ onInfo }: { onInfo: () => void }) {
  return (
    <section aria-labelledby="url-report-preview-title">
      <div className="flex items-center gap-1">
        <h2 id="url-report-preview-title" className="text-base leading-[19px] font-semibold text-[#1a1a1a]">이런 자료를 받아보실 수 있어요.</h2>
        <button type="button" onClick={onInfo} aria-label="분석 자료 안내" className="relative shrink-0 text-[#868686] before:absolute before:-inset-2">
          <Info size={14} aria-hidden />
        </button>
      </div>
      <ol className="mt-6 px-2">
        {URL_REPORT_SECTIONS.map((section, index) => (
          <li key={section.title} className={`relative flex items-start gap-4 ${index < URL_REPORT_SECTIONS.length - 1 ? "min-h-[57px]" : "min-h-[35px]"}`}>
            <span aria-hidden className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#bd2350] text-xs leading-[14px] font-semibold text-white">{index + 1}</span>
            {index < URL_REPORT_SECTIONS.length - 1 && <span aria-hidden className="absolute top-[30px] left-[10.5px] h-5 w-[3px] rounded-full bg-[#e3e8ea]" />}
            <div className="min-w-0">
              <h3 className="text-sm leading-[17px] font-semibold text-black1">{section.title}</h3>
              <p className="mt-0.5 text-xs leading-[14px] text-graytext1">{section.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
