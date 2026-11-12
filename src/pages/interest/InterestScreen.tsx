import { useState } from "react";
import InterestAlertSettings from "../../components/interest/InterestAlertSettings";
import InterestProductActions from "../../components/interest/InterestProductActions";
import InterestProductCard from "../../components/interest/InterestProductCard";
import InterestSort, { type InterestSortOrder } from "../../components/interest/InterestSort";
import InterestTabs from "../../components/interest/InterestTabs";
import { SAMPLE_INTEREST_PRODUCTS, type InterestProduct, type InterestStatus } from "../../data/interest";
import { readInterestPreference, writeInterestPreference } from "../../lib/interestStorage";

const byLatest = (a: InterestProduct, b: InterestProduct) => b.addedAt.localeCompare(a.addedAt);

const SORT_PRODUCTS: Record<InterestSortOrder, (a: InterestProduct, b: InterestProduct) => number> = {
  latest: byLatest,
  score: (a, b) => b.score - a.score || byLatest(a, b),
  change: (a, b) => Math.abs(b.scoreChange) - Math.abs(a.scoreChange) || byLatest(a, b),
};

export default function InterestScreen() {
  const [productStatus, setProductStatus] = useState(() => readInterestPreference("product-status"));
  const [status, setStatus] = useState<InterestStatus>("watching");
  const [sortByStatus, setSortByStatus] = useState<Record<InterestStatus, InterestSortOrder>>({
    watching: "latest",
    selling: "score",
  });
  const sort = sortByStatus[status];
  const productsByStatus: Record<InterestStatus, InterestProduct[]> = { watching: [], selling: [] };

  for (const product of SAMPLE_INTEREST_PRODUCTS) {
    const savedStatus = productStatus[product.productNumber];
    if (savedStatus === null) continue;
    const currentStatus = savedStatus === "watching" || savedStatus === "selling" ? savedStatus : product.status;
    productsByStatus[currentStatus].push({ ...product, status: currentStatus });
  }
  const products = productsByStatus[status].sort(SORT_PRODUCTS[sort]);

  const updateProductStatus = (productNumber: string, nextStatus: InterestStatus | null) => {
    const updated = { ...productStatus, ...readInterestPreference("product-status"), [productNumber]: nextStatus };
    setProductStatus(updated);
    writeInterestPreference("product-status", updated);
  };

  return (
    <main className="isolate min-h-dvh bg-back pb-24">
      <header className="bg-white">
        <div className="flex h-[52px] items-center justify-between gap-3 px-4">
          <h1 className="text-xl font-bold text-black1">관심 상품</h1>
          <InterestAlertSettings />
        </div>
        <InterestTabs
          status={status}
          counts={{ watching: productsByStatus.watching.length, selling: productsByStatus.selling.length }}
          onChange={setStatus}
        />
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
                      onMove={(nextStatus) => updateProductStatus(product.productNumber, nextStatus)}
                      onDelete={() => updateProductStatus(product.productNumber, null)}
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
