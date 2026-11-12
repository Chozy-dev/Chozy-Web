import type { ReactNode } from "react";
import type { InterestProduct } from "../../data/interest";
import InterestScoreBadge from "./InterestScoreBadge";

const number = new Intl.NumberFormat("ko-KR");

interface InterestProductCardProps {
  product: InterestProduct;
  actions?: ReactNode;
}

export default function InterestProductCard({ product, actions }: InterestProductCardProps) {
  return (
    <article className="rounded-[18px] bg-white p-5">
      <div className="mb-4 flex h-[17px] items-center justify-between gap-2">
        <p className="text-sm font-medium leading-[17px] text-graytext1">상품 번호 {product.productNumber}</p>
        {actions}
      </div>

      <div className="flex items-center gap-2.5">
        <img src={product.thumbnail} alt="" width={85} height={85} className="size-[85px] shrink-0 rounded-lg object-cover" />
        <div className="min-w-0 flex-1">
          <h2 className="line-clamp-2 break-keep wrap-anywhere text-sm leading-[17px]">{product.name}</h2>
          <p className="mt-0.5 text-xs font-medium leading-4 text-graytext1">{product.supplier}</p>
          <p className="mt-1 text-base font-bold leading-5 text-neutral-900">{number.format(product.wholesalePrice)}원</p>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-2.5 gap-y-px text-sm leading-5">
        <dt className="text-graytext1">재고 수량</dt>
        <dd>{number.format(product.stock)}개</dd>
        <dt className="text-graytext1">예상 마진</dt>
        <dd>
          <span className="font-medium text-rose-600">{number.format(product.estimatedMargin)}원</span>{" "}
          <span className="text-graytext1">(마진율 {number.format(product.marginRate)}%)</span>
        </dd>
        <dt className="text-graytext1">비용투자 적합도</dt>
        <dd><InterestScoreBadge score={product.score} change={product.scoreChange} /></dd>
      </dl>
    </article>
  );
}
