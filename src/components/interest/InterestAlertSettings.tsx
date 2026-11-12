import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { readInterestPreference, writeInterestPreference } from "../../lib/interestStorage";

const FIELDS = [
  { name: "priceChange", label: "공급가 변동률 (이상이면 알림)", unit: "%", min: 0.1, max: undefined, step: "any" },
  { name: "scoreChange", label: "AI 점수 변동폭 (이상이면 알림)", unit: "점", min: 1, max: 100, step: 1 },
] as const;

type AlertThresholds = Record<(typeof FIELDS)[number]["name"], number>;

const DEFAULT_THRESHOLDS: AlertThresholds = { priceChange: 10, scoreChange: 5 };

function readThresholds(): AlertThresholds {
  const saved = readInterestPreference("alert-thresholds");
  const thresholds = { ...DEFAULT_THRESHOLDS };

  for (const { name, min, max, step } of FIELDS) {
    const value = saved[name];
    if (typeof value === "number" && Number.isFinite(value) && value >= min &&
        (max === undefined || value <= max) && (step === "any" || Number.isInteger(value))) {
      thresholds[name] = value;
    }
  }
  return thresholds;
}

function ThresholdField({ field, value }: { field: (typeof FIELDS)[number]; value: number }) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const showSpinner = field.name === "scoreChange";

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-medium text-neutral-700">{field.label}</label>
      <div className="grid grid-cols-[minmax(0,1fr)_1rem] items-center gap-3">
        <div className="relative">
          <input
            ref={inputRef}
            id={id}
            name={field.name}
            type="number"
            inputMode={field.step === "any" ? "decimal" : "numeric"}
            aria-describedby={`${id}-unit`}
            min={field.min}
            max={field.max}
            step={field.step}
            defaultValue={value}
            required
            className="h-10 w-full rounded-[10px] border border-line px-3.5 text-sm font-medium outline-none focus:border-primary [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          {showSpinner && (
            <div className="absolute top-1/2 right-3.5 flex w-4 -translate-y-1/2 flex-col overflow-hidden rounded-sm bg-back text-[9px] leading-3.5 text-neutral-600">
              <button type="button" aria-label="점수 변동폭 증가" onClick={() => inputRef.current?.stepUp()} className="hover:bg-line">▲</button>
              <button type="button" aria-label="점수 변동폭 감소" onClick={() => inputRef.current?.stepDown()} className="hover:bg-line">▼</button>
            </div>
          )}
        </div>
        <span id={`${id}-unit`} className="text-center text-sm text-graytext1">{field.unit}</span>
      </div>
    </div>
  );
}

interface AlertSettingsSheetProps {
  thresholds: AlertThresholds;
  onSave: (thresholds: AlertThresholds) => void;
  onClose: () => void;
}

function AlertSettingsSheet({ thresholds, onSave, onClose }: AlertSettingsSheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const id = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    titleRef.current?.focus({ preventScroll: true });

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const updated = { ...thresholds };
    for (const { name } of FIELDS) updated[name] = Number(data.get(name));
    onSave(updated);
    dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      className="fixed inset-x-0 top-auto bottom-0 mx-auto my-0 max-h-dvh w-full max-w-md overflow-y-auto rounded-t-xl bg-white p-0 text-black1 backdrop:bg-black/55"
    >
      <form onSubmit={handleSave} className="px-4 pt-4 pb-[max(15px,env(safe-area-inset-bottom))]">
        <button
          type="button"
          aria-label="알림 기준 설정 닫기"
          onClick={() => dialogRef.current?.close()}
          className="mx-auto -mt-2 flex h-5 w-[76px] items-center justify-center rounded"
        >
          <span aria-hidden className="h-1 w-[60px] rounded-full bg-neutral-400" />
        </button>
        <h2 ref={titleRef} tabIndex={-1} id={`${id}-title`} className="mt-4 text-base font-bold outline-none">
          알림 기준 설정
        </h2>
        <p id={`${id}-description`} className="text-xs text-graytext1">관심상품에서 아래 기준을 넘으면 알려드려요</p>

        <div className="mt-[22px] space-y-4">
          {FIELDS.map((field) => <ThresholdField key={field.name} field={field} value={thresholds[field.name]} />)}
        </div>

        <p className="mt-5 px-0.5 text-xs leading-tight text-graytext1">
          품절·재입고는 기준값 없이 항상 알려드려요.<br />
          알림 방식(푸시/이메일)은 마이페이지 &gt; 알림 설정에서 바꿀 수 있어요.
        </p>
        <button type="submit" className="mt-3 flex h-11 w-full items-center justify-center rounded-xl bg-burgundy text-xs font-semibold text-white">
          저장
        </button>
      </form>
    </dialog>
  );
}

export default function InterestAlertSettings() {
  const [thresholds, setThresholds] = useState(readThresholds);
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" aria-haspopup="dialog" onClick={() => setOpen(true)} className="text-xs text-graytext1">
        알림 기준 설정
      </button>
      {open && (
        <AlertSettingsSheet
          thresholds={thresholds}
          onSave={(updated) => {
            setThresholds(updated);
            writeInterestPreference("alert-thresholds", updated);
          }}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
