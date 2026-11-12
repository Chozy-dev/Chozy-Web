import { ArrowLeftRight, EllipsisVertical, Trash2 } from "lucide-react";
import type { InterestStatus } from "../../data/interest";
import InterestPopover from "./InterestPopover";

interface InterestProductActionsProps {
  productNumber: string;
  status: InterestStatus;
  onMove: (status: InterestStatus) => void;
  onDelete: () => void;
}

export default function InterestProductActions({ productNumber, status, onMove, onDelete }: InterestProductActionsProps) {
  const nextStatus = status === "watching" ? "selling" : "watching";
  const actionClassName = "flex min-h-7 w-full items-center gap-2.5 rounded-xl px-2 text-left text-xs font-medium hover:bg-back focus-visible:bg-back active:bg-back";

  return (
    <InterestPopover
      trigger={<EllipsisVertical size={20} aria-hidden />}
      label={`상품 번호 ${productNumber} 메뉴`}
      triggerClassName="-mr-2 flex size-8 items-center justify-center text-graytext1"
      align="right"
    >
      {(close) => (
        <ul className="w-[188px] space-y-1">
          <li>
            <button
              type="button"
              className={actionClassName}
              onClick={() => {
                close();
                onMove(nextStatus);
              }}
            >
              <ArrowLeftRight size={12} aria-hidden className="shrink-0 text-black2" />
              {nextStatus === "selling" ? "판매중으로 전환" : "관심중으로 전환"}
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`${actionClassName} text-rose-600`}
              onClick={() => {
                close();
                if (window.confirm("이 상품을 관심상품에서 삭제할까요?")) onDelete();
              }}
            >
              <Trash2 size={12} aria-hidden className="shrink-0" />
              삭제하기
            </button>
          </li>
        </ul>
      )}
    </InterestPopover>
  );
}
