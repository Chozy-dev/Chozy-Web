import { useState } from "react";
import factCheckIcon from "../../assets/home/fact-check.svg";
import NumberInput from "../../components/common/NumberInput";
import Select, { type SelectOption } from "../../components/common/Select";
import Button from "../../components/common/Button";
import { CHANNELS, type ChannelKey } from "../../data/home";

/* 간단 마진 계산기 — 도매가 입력 시 마진율별 판매가 즉시 계산
   (배송비·광고비·부가세 미반영 단순 계산) */

const MARGIN_RATES = [0.2, 0.3, 0.4];

const CHANNEL_OPTIONS: SelectOption<ChannelKey>[] = CHANNELS.map((c) => ({
  value: c.key,
  label: `${c.label} (${(c.fee * 100).toFixed(1)}%)`,
}));

interface MarginCalculatorProps {
  onVerify?: () => void;
}

export default function MarginCalculator({ onVerify }: MarginCalculatorProps) {
  const [wholesale, setWholesale] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [channelKey, setChannelKey] = useState<ChannelKey>(CHANNELS[0].key);

  const channel = CHANNELS.find((c) => c.key === channelKey) ?? CHANNELS[0];
  const wholesaleNum = Number(wholesale) || 0;
  const salePriceNum = Number(salePrice) || 0;

  /* 판매가 = 도매가 ÷ (1 - 수수료 - 목표마진율), 100원 단위 올림 */
  const priceForMargin = (rate: number) => Math.ceil(wholesaleNum / (1 - channel.fee - rate) / 100) * 100;
  /* 판매가 직접 입력 시 실제 마진율 */
  const actualMarginRate =
    salePriceNum > 0
      ? Math.round(((salePriceNum - wholesaleNum - salePriceNum * channel.fee) / salePriceNum) * 1000) / 10
      : null;

  return (
    <section className="bg-white rounded-2xl mx-5 mb-3 p-5">
      <p className="text-[15px] font-bold text-gray-900 mb-4">간단 마진 계산기</p>

      <div className="grid grid-cols-2 gap-2.5 mb-2.5">
        <NumberInput label="도매가" value={wholesale} onChange={setWholesale} placeholder="8000" />
        <NumberInput label="판매가 (선택)" value={salePrice} onChange={setSalePrice} placeholder="8000" />
      </div>

      <Select value={channelKey} options={CHANNEL_OPTIONS} onChange={setChannelKey} className="mb-3" />

      {/* 도매가 입력 시 마진율별 판매가 */}
      {wholesaleNum > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-3">
          {MARGIN_RATES.map((rate) => (
            <div key={rate} className="bg-gray-50 rounded-xl px-2.5 py-2 text-center">
              <p className="text-[10px] text-gray-400 mb-0.5">마진 {rate * 100}%</p>
              <p className="text-[13px] font-semibold text-gray-900">{priceForMargin(rate).toLocaleString()}원</p>
            </div>
          ))}
          {actualMarginRate !== null && (
            <p className="col-span-3 text-[11px] text-primary text-center">
              입력한 판매가 기준 마진율 {actualMarginRate}%
            </p>
          )}
        </div>
      )}

      <div className="bg-primary-light/60 rounded-xl p-4 mb-5">
        <div className="flex items-center gap-1.5 mb-1.5">
          <img src={factCheckIcon} alt="" className="w-[15px] h-3.5" />
          <p className="text-xs font-bold text-gray-800">도매가를 넣으면 마진율별 판매가가 바로 나와요</p>
        </div>
        <p className="text-[11px] text-gray-500 leading-relaxed">
          배송비·광고비·부가세는 반영 안 된 단순 계산이에요. (부가세는 매입세액공제 등 개별 사업자 상황에 따라 달라
          별도 계산 필요) 정확한 도매가·경쟁 데이터로 검증하려면 비용투자 적합도 분석을 이용해보세요.
        </p>
      </div>

      <Button onClick={onVerify}>실제 데이터로 검증하기</Button>
    </section>
  );
}
