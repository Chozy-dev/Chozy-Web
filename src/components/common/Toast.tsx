import { useEffect } from "react";

/* 토스트 — 화면 하단에 잠시 노출되는 안내 메시지 */

interface ToastProps {
  message: string;
  open: boolean;
  onClose: () => void;
  /** 자동으로 닫히기까지의 시간(ms) */
  duration?: number;
}

export default function Toast({ message, open, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-[87px] z-50 flex justify-center" role="status" aria-live="polite">
      <div className="w-full max-w-md px-4">
        <div className="rounded-sm bg-neutral-500 px-4 py-3.5 text-base font-medium text-white">{message}</div>
      </div>
    </div>
  );
}
