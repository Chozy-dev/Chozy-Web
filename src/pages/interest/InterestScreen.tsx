import { useState } from "react";
import InterestProductCard from "../../components/interest/InterestProductCard";
import InterestTabs from "../../components/interest/InterestTabs";
import { SAMPLE_INTEREST_PRODUCTS, type InterestStatus } from "../../data/interest";

export default function InterestScreen() {
  const [status, setStatus] = useState<InterestStatus>("watching");
  const watching = SAMPLE_INTEREST_PRODUCTS.filter((product) => product.status === "watching");
  const selling = SAMPLE_INTEREST_PRODUCTS.filter((product) => product.status === "selling");
  const products = status === "watching" ? watching : selling;

  return (
    <main className="min-h-dvh bg-back pb-24">
      <header className="bg-white">
        <div className="flex h-[52px] items-center justify-between gap-3 px-4">
          <h1 className="text-xl font-bold text-black1">관심 상품</h1>
          <button type="button" disabled className="text-xs text-graytext1">
            알림 기준 설정
          </button>
        </div>
        <InterestTabs status={status} counts={{ watching: watching.length, selling: selling.length }} onChange={setStatus} />
      </header>

      <div className="px-4 pt-4">
        {products.length === 0 ? (
          <p className="py-16 text-center text-sm text-graytext1">
            {status === "watching" ? "관심중인 상품이 없어요." : "판매중인 상품이 없어요."}
          </p>
        ) : (
          <ul className="space-y-4">
            {products.map((product) => (
              <li key={product.productNumber}>
                <InterestProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
