/* 세그먼트 토글 — 활성 항목만 흰 알약 (예: 키워드/상품, 인기순/AI 추천순)
   레이아웃·색상은 Figma 스펙 기준 */

export interface SegmentOption<T extends string = string> {
  k: T;
  l: string;
}

interface SegmentToggleProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export default function SegmentToggle<T extends string>({ options, value, onChange }: SegmentToggleProps<T>) {
  return (
    <div className="px-1 py-0.5 bg-back rounded-full inline-flex justify-start items-center">
      {options.map((o) => {
        const active = value === o.k;
        return (
          <button
            key={o.k}
            onClick={() => onChange(o.k)}
            className={
              active
                ? "p-1 bg-white rounded-[100px] flex justify-center items-center text-xs font-medium text-black2"
                : "p-1.5 flex justify-center items-center text-xs font-normal text-gray1"
            }
          >
            {o.l}
          </button>
        );
      })}
    </div>
  );
}
