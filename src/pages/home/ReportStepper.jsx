import { Fragment } from "react";
import { REPORT_STEPS } from "../../data/home";

/* 투자 리포트 만들기 — 4단계 스테퍼 (1단계 활성) */

export default function ReportStepper({ activeStep = 1 }) {
  return (
    <section className="bg-white rounded-2xl mx-3 mb-2.5 p-4">
      <p className="text-[15px] font-bold text-gray-900 mb-5">투자 리포트 만들기</p>
      <div className="flex items-start">
        {REPORT_STEPS.map((step, i) => {
          const active = step.num === activeStep;
          return (
            <Fragment key={step.num}>
              {i !== 0 && <div className="flex-1 h-px bg-gray-200 mt-[15px] min-w-2" />}
              <div className="flex flex-col items-center">
                <span
                  className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-[13px] font-semibold mb-1.5 ${
                    active ? "bg-primary text-white" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step.num}
                </span>
                <p className={`text-[11px] font-semibold whitespace-nowrap ${active ? "text-gray-900" : "text-gray-500"}`}>
                  {step.label}
                </p>
                <p className="text-[10px] text-gray-400 whitespace-nowrap mt-0.5">{step.caption}</p>
              </div>
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
