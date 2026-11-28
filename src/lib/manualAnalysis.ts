export interface ManualAnalysisValues {
  productName: string;
  wholesalePrice: string;
  shippingFee: string;
  hasPricePolicy: boolean;
  minimumSalePrice: string;
}

export interface ManualAnalysisProduct {
  productName: string;
  wholesalePrice: number;
  shippingFee: number;
  minimumSalePrice?: number;
}

export type ManualAnalysisErrors = Partial<Record<"productName" | "wholesalePrice" | "shippingFee" | "minimumSalePrice", string>>;

function isWonAmount(value: string, minimum: number) {
  return /^\d+$/.test(value) && Number.isSafeInteger(Number(value)) && Number(value) >= minimum;
}

export function validateManualAnalysis(values: ManualAnalysisValues): ManualAnalysisErrors {
  const errors: ManualAnalysisErrors = {};
  if (!values.productName.trim()) errors.productName = "상품명을 입력해주세요.";
  if (!isWonAmount(values.wholesalePrice, 1)) errors.wholesalePrice = "도매가를 1원 이상의 정수로 입력해주세요.";
  if (!isWonAmount(values.shippingFee, 0)) errors.shippingFee = "배송비를 0원 이상의 정수로 입력해주세요.";
  if (values.hasPricePolicy && !isWonAmount(values.minimumSalePrice, 1)) {
    errors.minimumSalePrice = "최저판매가를 1원 이상의 정수로 입력해주세요.";
  }
  return errors;
}

export function toManualAnalysisProduct(values: ManualAnalysisValues): ManualAnalysisProduct {
  return {
    productName: values.productName.trim(),
    wholesalePrice: Number(values.wholesalePrice),
    shippingFee: Number(values.shippingFee),
    ...(values.hasPricePolicy ? { minimumSalePrice: Number(values.minimumSalePrice) } : {}),
  };
}
