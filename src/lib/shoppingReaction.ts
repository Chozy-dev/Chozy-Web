import type { ShoppingReaction } from "../data/screeningDetails";

export function getShoppingReaction(searchChange: number, shoppingChange: number): ShoppingReaction {
  const searchGrowing = searchChange >= 10;
  const shoppingGrowing = shoppingChange >= 10;
  if (searchGrowing && shoppingGrowing) return "golden";
  if (searchGrowing) return "buzz";
  return shoppingGrowing ? "quiet" : "declining";
}

export function formatChange(value: number): string {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}
