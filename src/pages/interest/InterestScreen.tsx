import { useState } from "react";
import InterestProductActions from "../../components/interest/InterestProductActions";
import InterestProductCard from "../../components/interest/InterestProductCard";
import InterestSort, { type InterestSortOrder } from "../../components/interest/InterestSort";
import InterestTabs from "../../components/interest/InterestTabs";
import { SAMPLE_INTEREST_PRODUCTS, type InterestProduct, type InterestStatus } from "../../data/interest";

const byLatest = (a: InterestProduct, b: InterestProduct) => b.addedAt.localeCompare(a.addedAt);

const SORT_PRODUCTS: Record<InterestSortOrder, (a: InterestProduct, b: InterestProduct) => number> = {
  latest: byLatest,
  score: (a, b) => b.score - a.score || byLatest(a, b),
  change: (a, b) => Math.abs(b.scoreChange) - Math.abs(a.scoreChange) || byLatest(a, b),
};

export default function InterestScreen() {
  const [savedProducts, setSavedProducts] = useState(SAMPLE_INTEREST_PRODUCTS);
  const [status, setStatus] = useState<InterestStatus>("watching");
  const [sortByStatus, setSortByStatus] = useState<Record<InterestStatus, InterestSortOrder>>({
    watching: "latest",
    selling: "score",
  });
  const sort = sortByStatus[status];
  const watching = savedProducts.filter((product) => product.status === "watching");
  const selling = savedProducts.filter((product) => product.status === "selling");
  const products = (status === "watching" ? watching : selling).sort(SORT_PRODUCTS[sort]);

  const moveProduct = (productNumber: string, nextStatus: InterestStatus) => {
    setSavedProducts((previous) =>
      previous.map((product) => product.productNumber === productNumber ? { ...product, status: nextStatus } : product),
    );
  };

  const deleteProduct = (productNumber: string) => {
    setSavedProducts((previous) => previous.filter((product) => product.productNumber !== productNumber));
  };

  return (
    <main className="isolate min-h-dvh bg-back pb-24">
      <header className="bg-white">
        <div className="flex h-[52px] items-center justify-between gap-3 px-4">
          <h1 className="text-xl font-bold text-black1">관심 상품</h1>
          <button type="button" disabled className="text-xs text-graytext1">
            알림 기준 설정
          </button>
        </div>
        <InterestTabs status={status} counts={{ watching: watching.length, selling: selling.length }} onChange={setStatus} />
      </header>

      <div className="px-4 pt-2">
        <div className="mb-2">
          <InterestSort
            key={status}
            value={sort}
            onChange={(order) => setSortByStatus((previous) => ({ ...previous, [status]: order }))}
          />
        </div>
        {products.length === 0 ? (
          <p className="py-16 text-center text-sm text-graytext1">
            {status === "watching" ? "관심중인 상품이 없어요." : "판매중인 상품이 없어요."}
          </p>
        ) : (
          <ul className="space-y-4">
            {products.map((product) => (
              <li key={product.productNumber}>
                <InterestProductCard
                  product={product}
                  actions={
                    <InterestProductActions
                      productNumber={product.productNumber}
                      status={product.status}
                      onMove={(nextStatus) => moveProduct(product.productNumber, nextStatus)}
                      onDelete={() => deleteProduct(product.productNumber)}
                    />
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
