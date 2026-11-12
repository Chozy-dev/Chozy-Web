import sampleProductImage from "../assets/interest/sample-product.webp";

export type InterestStatus = "watching" | "selling";

export interface InterestProduct {
  productNumber: string;
  name: string;
  supplier: string;
  thumbnail: string;
  wholesalePrice: number;
  stock: number;
  estimatedMargin: number;
  marginRate: number;
  score: number;
  scoreChange: number;
  status: InterestStatus;
  addedAt: string;
}

const sampleProduct = {
  name: "플리츠바지 여자여름바지 플리츠주름바지 여자밴딩팬츠",
  supplier: "ujd720",
  thumbnail: sampleProductImage,
  wholesalePrice: 4500,
  stock: 1454,
  estimatedMargin: 4500,
  marginRate: 50,
  status: "watching",
} as const;

export const SAMPLE_INTEREST_PRODUCTS: InterestProduct[] = [
  { ...sampleProduct, productNumber: "56508793", score: 94, scoreChange: -2, addedAt: "2026-11-12" },
  { ...sampleProduct, productNumber: "56508792", score: 97, scoreChange: 1, addedAt: "2026-11-11" },
  { ...sampleProduct, productNumber: "56508791", score: 90, scoreChange: -6, addedAt: "2026-11-10" },
  { ...sampleProduct, productNumber: "56508790", score: 94, scoreChange: 2, addedAt: "2026-11-09" },
];
