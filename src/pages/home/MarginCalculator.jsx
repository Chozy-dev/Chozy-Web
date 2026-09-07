import { useState } from "react";
import { ClipboardCheck } from "lucide-react";
import { CHANNELS } from "../../data/home";

/* 간단 마진 계산기 — 도매가 입력 시 마진율별 판매가 즉시 계산
   (배송비·광고비·부가세 미반영 단순 계산) */

const MARGIN_RATES = [0.2, 0.3, 0.4];

export default function MarginCalculator({ onVerify }) {
  const [wholesale, setWholesale] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [channelKey, setChannelKey] = useState(CHANNELS[0].key);

  const channel = CHANNELS.find((c) => c.key === channelKey);
  const wholesaleNum = Number(wholesale) || 0;
  const salePriceNum = Number(salePrice) || 0;

  /* 판매가 = 도매가 ÷ (1 - 수수료 - 목표마진율), 100원 단위 올림 */
  const priceForMargin = (rate) => Math.ceil(wholesaleNum / (1 - channel.fee - rate) / 100) * 100;
  /* 판매가 직접 입력 시 실제 마진율 */
  const actualMarginRate =
    salePriceNum > 0 ? Math.round(((salePriceNum - wholesaleNum - salePriceNum * channel.fee) / salePriceNum) * 1000) / 10 : null;

  return (
    <section className="bg-white rounded-2xl mx-3 mb-2.5 p-4">
      <p className="text-[15px] font-bold text-gray-900 mb-4">간단 마진 계산기</p>

      <div className="grid grid-cols-2 gap-2.5 mb-2.5">
        <div>
          <label className="block text-xs text-gray-500 mb-1.5">도매가</label>
          <input
            type="number"
            value={wholesale}
            onChange={(e) => setWholesale(e.target.value)}
            placeholder="8000"
            className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-3 outline-none placeholder:text-gray-300 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1.5">판매가 (선택)</label>
          <input
            type="number"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
            placeholder="8000"
            className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-3 outline-none placeholder:text-gray-300 focus:border-primary"
          />
        </div>
      </div>

      <select
        value={channelKey}
        onChange={(e) => setChannelKey(e.target.value)}
        className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-3 bg-white text-gray-800 mb-3"
      >
        {CHANNELS.map((c) => (
          <option key={c.key} value={c.key}>
            {c.label} ({(c.fee * 100).toFixed(1)}%)
          </option>
        ))}
      </select>

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

      <div className="bg-primary-light/60 rounded-xl p-3.5 mb-4">
        <div className="flex items-center gap-1.5 mb-1.5">
          <ClipboardCheck size={14} className="text-primary" />
          <p className="text-xs font-bold text-gray-800">도매가를 넣으면 마진율별 판매가가 바로 나와요</p>
        </div>
        <p className="text-[11px] text-gray-500 leading-relaxed">
          배송비·광고비·부가세는 반영 안 된 단순 계산이에요. (부가세는 매입세액공제 등 개별 사업자 상황에 따라 달라
          별도 계산 필요) 정확한 도매가·경쟁 데이터로 검증하려면 비용투자 적합도 분석을 이용해보세요.
        </p>
      </div>

      <button onClick={onVerify} className="w-full bg-primary-dark text-white text-sm font-semibold rounded-xl py-3.5">
        실제 데이터로 검증하기
      </button>
    </section>
  );
}
