import { Fragment } from "react";
import { REPORT_STEPS } from "../../data/home";

/* 투자 리포트 만들기 — 4단계 스테퍼
   각 단계는 해당 리포트 페이지로 이동하는 버튼 (페이지 준비 전까지 onStepClick 미연결) */

interface ReportStepperProps {
  activeStep?: number;
  onStepClick?: (step: number) => void;
}

export default function ReportStepper({ activeStep = 1, onStepClick }: ReportStepperProps) {
  return (
    <section className="bg-white rounded-2xl mx-5 mb-3 p-5">
      <p className="text-[15px] font-bold text-gray-900 mb-5">투자 리포트 만들기</p>
      <div className="flex items-start">
        {REPORT_STEPS.map((step, i) => {
          const active = step.num === activeStep;
          return (
            <Fragment key={step.num}>
              {i !== 0 && <div className="flex-1 h-px bg-gray-200 mt-[15px] min-w-2" />}
              <button
                type="button"
                onClick={() => onStepClick?.(step.num)}
                aria-current={active ? "step" : undefined}
                aria-label={`${step.num}단계 ${step.label} — ${step.caption}`}
                className="flex flex-col items-center"
              >
                <span
                  className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-[13px] font-semibold mb-1.5 ${
                    active ? "bg-primary text-white" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step.num}
                </span>
                <span className={`text-[11px] font-semibold whitespace-nowrap ${active ? "text-gray-900" : "text-gray-500"}`}>
                  {step.label}
                </span>
                <span className="text-[10px] text-gray-400 whitespace-nowrap mt-0.5">{step.caption}</span>
              </button>
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
