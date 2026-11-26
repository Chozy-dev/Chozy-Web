import { useEffect, type ReactNode } from "react";

/* 공통 토스트 — 화면 하단에 잠시 노출되는 안내 메시지
   above-button: 고정 버튼 위 20px, above-nav: 하단 탭 바 위 12px */

interface ToastProps {
  message: string;
  open: boolean;
  onClose: () => void;
  /** 자동으로 닫히기까지의 시간(ms) */
  duration?: number;
  /** 메시지 왼쪽 아이콘 (예: 성공 체크) */
  icon?: ReactNode;
  bottom?: "default" | "above-button" | "above-nav";
}

/* above-button: 버튼 하단 여백 40 + 버튼 높이 48 + 간격 20 */
const BOTTOM = {
  default: "bottom-10",
  "above-button": "bottom-[108px]",
  "above-nav": "bottom-[calc(var(--compact-tab-bar-height)+env(safe-area-inset-bottom,0px)+12px)]",
};

export default function Toast({ message, open, onClose, duration = 3000, icon, bottom = "default" }: ToastProps) {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div className={`fixed inset-x-0 ${BOTTOM[bottom]} z-50 flex justify-center`} role="status" aria-live="polite">
      <div className="w-full max-w-md px-4">
        <div className="min-h-12 rounded-[15px] bg-neutral-500 px-4 py-3 flex items-center gap-2.5 text-base font-medium text-white">
          {icon}
          <span className="flex-1">{message}</span>
        </div>
      </div>
    </div>
  );
}
