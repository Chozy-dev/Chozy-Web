import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import Checkbox from "../common/Checkbox";
import NumberInput from "../common/NumberInput";
import TextInput from "../common/TextInput";
import SearchSubmitButton from "./SearchSubmitButton";
import ManualAnalysisScope from "./ManualAnalysisScope";
import { toManualAnalysisProduct, validateManualAnalysis, type ManualAnalysisErrors, type ManualAnalysisProduct, type ManualAnalysisValues } from "../../lib/manualAnalysis";

interface ManualAnalysisFormProps {
  initialProductName?: string;
  onUrlInput: () => void;
  onAnalyze: (product: ManualAnalysisProduct) => void;
}

function FieldError({ id, children }: { id: string; children?: string }) {
  return children ? <p id={id} role="alert" className="mt-1.5 text-xs leading-4 font-semibold text-rise">{children}</p> : null;
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return <label htmlFor={htmlFor} className="mb-2 block text-xs leading-[14px] font-medium text-[#868686]">{children} <span className="text-rise">*</span></label>;
}

export default function ManualAnalysisForm({ initialProductName = "", onUrlInput, onAnalyze }: ManualAnalysisFormProps) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<ManualAnalysisValues>({ productName: initialProductName, wholesalePrice: "", shippingFee: "", hasPricePolicy: false, minimumSalePrice: "" });
  const [errors, setErrors] = useState<ManualAnalysisErrors>({});

  function updateField<K extends keyof ManualAnalysisValues>(field: K, value: ManualAnalysisValues[K]) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field === "hasPricePolicy" ? "minimumSalePrice" : field]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateManualAnalysis(values);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLInputElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    onAnalyze(toManualAnalysisProduct(values));
  }

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} aria-labelledby={`${id}-title`}>
      <div className="flex items-center justify-between gap-3">
        <h2 id={`${id}-title`} className="text-lg leading-5 font-semibold text-[#1a1a1a]">상품 정보를 직접 넣어주세요</h2>
        <button type="button" onClick={onUrlInput} className="shrink-0 text-xs leading-[14px] font-bold text-burgundy underline">URL로 분석하기</button>
      </div>

      <div className="mt-[18px] rounded-2xl border border-divider bg-white p-[15px]">
        <FieldLabel htmlFor={`${id}-productName`}>상품명</FieldLabel>
        <TextInput id={`${id}-productName`} name="productName" variant="manual" required placeholder="예) 캠핑 미니 랜턴 충전식" value={values.productName} onChange={(event) => updateField("productName", event.target.value)} aria-invalid={Boolean(errors.productName)} aria-describedby={`${id}-name-help${errors.productName ? ` ${id}-name-error` : ""}`} />
        <p id={`${id}-name-help`} className="mt-1.5 px-0.5 text-xs leading-[14px] font-medium text-graytext1">이 이름으로 검색량·경쟁강도·트렌드를 분석해요.</p>
        <FieldError id={`${id}-name-error`}>{errors.productName}</FieldError>

        <div className="mt-3">
          <FieldLabel htmlFor={`${id}-wholesalePrice`}>도매가(원)</FieldLabel>
          <NumberInput id={`${id}-wholesalePrice`} name="wholesalePrice" aria-label="도매가" variant="manual" required min={1} max={Number.MAX_SAFE_INTEGER} step={100} inputMode="numeric" placeholder="8000" value={values.wholesalePrice} onChange={(value) => updateField("wholesalePrice", value)} aria-invalid={Boolean(errors.wholesalePrice)} aria-describedby={errors.wholesalePrice ? `${id}-wholesale-error` : undefined} />
          <FieldError id={`${id}-wholesale-error`}>{errors.wholesalePrice}</FieldError>
        </div>

        <div className="mt-3">
          <FieldLabel htmlFor={`${id}-shippingFee`}>배송비(원)</FieldLabel>
          <NumberInput id={`${id}-shippingFee`} name="shippingFee" aria-label="배송비" variant="manual" required min={0} max={Number.MAX_SAFE_INTEGER} step={100} inputMode="numeric" placeholder="8000" value={values.shippingFee} onChange={(value) => updateField("shippingFee", value)} aria-invalid={Boolean(errors.shippingFee)} aria-describedby={`${id}-shipping-help${errors.shippingFee ? ` ${id}-shipping-error` : ""}`} />
          <p id={`${id}-shipping-help`} className="mt-1.5 px-0.5 text-xs leading-4 font-medium tracking-[-0.4px] text-graytext1">무료배송이면 0을 넣어주세요 - 빠지면 마진율이 실제보다 높게 나와요.</p>
          <FieldError id={`${id}-shipping-error`}>{errors.shippingFee}</FieldError>
        </div>

        <div className="mt-4 border-t border-line pt-4">
          <p className="mb-2 text-xs leading-[14px] font-medium text-[#868686]">최종준수가 <span className="text-gray1">(선택)</span></p>
          <Checkbox checked={values.hasPricePolicy} onChange={(event) => updateField("hasPricePolicy", event.target.checked)} aria-controls={values.hasPricePolicy ? `${id}-minimumSalePrice` : undefined}>가격 준수 정책이 있어요(최저판매가 지정)</Checkbox>
          {values.hasPricePolicy && (
            <div className="mt-2">
              <NumberInput id={`${id}-minimumSalePrice`} name="minimumSalePrice" aria-label="최저판매가" variant="manual" required min={1} max={Number.MAX_SAFE_INTEGER} step={100} inputMode="numeric" placeholder="최종준수가(최저 판매가) 입력" value={values.minimumSalePrice} onChange={(value) => updateField("minimumSalePrice", value)} aria-invalid={Boolean(errors.minimumSalePrice)} aria-describedby={`${id}-price-help${errors.minimumSalePrice ? ` ${id}-price-error` : ""}`} />
              <p id={`${id}-price-help`} className="mt-1.5 text-xs leading-4 font-medium text-graytext1">이 가격보다 싸게 팔 수 없어서, 마진 상한이 여기서 정해져요.</p>
              <FieldError id={`${id}-price-error`}>{errors.minimumSalePrice}</FieldError>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3"><ManualAnalysisScope /></div>
      <SearchSubmitButton disabled={false} fontWeight="bold" className="mt-4">분석하기</SearchSubmitButton>
    </form>
  );
}
