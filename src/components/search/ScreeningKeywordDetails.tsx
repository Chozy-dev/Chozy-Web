import { useId } from "react";
import Select from "../common/Select";
import ScreeningResultSummary from "./ScreeningResultSummary";
import SearchTrendChart from "./SearchTrendChart";
import ShoppingReactionCard from "./ShoppingReactionCard";
import { COMPETITION_LABELS, type ScreeningResult } from "../../data/screening";
import { getExampleKeywordDetails, getExampleShoppingChange, SHOPPING_CATEGORIES, type ShoppingCategory, type TrendPeriod } from "../../data/screeningDetails";
import { formatChange } from "../../lib/shoppingReaction";

export interface ScreeningDetailPreferences {
  category: ShoppingCategory;
  period: TrendPeriod;
}

interface ScreeningKeywordDetailsProps {
  result: ScreeningResult;
  preferences: ScreeningDetailPreferences;
  onPreferencesChange: (preferences: ScreeningDetailPreferences) => void;
  onAnalyze: () => void;
}

function changeColor(change: number) {
  return change < 0 ? "text-rise" : change > 0 ? "text-[#009b5d]" : "text-black1";
}

export default function ScreeningKeywordDetails({ result, preferences, onPreferencesChange, onAnalyze }: ScreeningKeywordDetailsProps) {
  const categoryLabelId = useId();
  const details = getExampleKeywordDetails(result.uploadOrder);
  const shoppingChange = getExampleShoppingChange(preferences.category);

  return (
    <article aria-label={`${result.keyword} 상세 결과`} className="rounded-2xl bg-white p-4 text-black1">
      <ScreeningResultSummary result={result} />

      <dl className="mt-4 border-t border-line pt-3 text-xs leading-[14px] font-medium">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <div className="flex items-center gap-1.5"><dt className="text-graytext1">클릭률</dt><dd>{details.clickRate}%</dd></div>
          <div className="flex items-center gap-1.5"><dt className="text-graytext1">광고 경쟁정도</dt><dd>{COMPETITION_LABELS[result.competition]} (노출광고 {details.adCount}개)</dd></div>
        </div>
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <dt className="text-graytext1">검색 추이 (작년 같은 시기 대비)</dt><dd className={changeColor(details.searchChange)}>{formatChange(details.searchChange)}</dd>
        </div>
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <dt className="text-graytext1">쇼핑 클릭 (작년 같은 시기 대비)</dt>
          <dd className={shoppingChange === null ? "text-gray2" : changeColor(shoppingChange)}>{shoppingChange === null ? "분야 선택 전" : formatChange(shoppingChange)}</dd>
        </div>
      </dl>

      <div className="mt-4 grid grid-cols-[37px_minmax(0,1fr)] items-center">
        <span id={categoryLabelId} className="text-xs leading-[14px] font-medium text-gray2">분야</span>
        <Select<ShoppingCategory>
          value={preferences.category}
          onChange={(category) => onPreferencesChange({ ...preferences, category })}
          options={[...SHOPPING_CATEGORIES]}
          variant="screening"
          labelledBy={categoryLabelId}
          className="min-w-0"
        />
      </div>

      <div className="mt-4" aria-live="polite">
        <ShoppingReactionCard searchChange={details.searchChange} shoppingChange={shoppingChange} />
      </div>
      <div className="mt-4">
        <SearchTrendChart keyword={result.keyword} period={preferences.period} onPeriodChange={(period) => onPreferencesChange({ ...preferences, period })} />
      </div>
      <button type="button" onClick={onAnalyze} className="mt-7 flex min-h-[45px] w-full items-center justify-center rounded-2xl bg-burgundy px-3 py-3 text-xs leading-[14px] font-medium text-white">
        이 키워드로 정밀 분석 시작 →
      </button>
    </article>
  );
}
