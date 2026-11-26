import { Check, Lightbulb, TrendingDown, TrendingUp } from "lucide-react";
import { formatChange, getShoppingReaction } from "../../lib/shoppingReaction";
import type { ShoppingReaction } from "../../data/screeningDetails";

const REACTIONS = {
  golden: {
    title: "지금이 골든타임",
    icon: Check,
    colors: "bg-[#edffe9] text-[#009b5d]",
    description: ["검색도 구매도 함께 늘고 있어요.", "들어가기 좋은 때예요. 마진부터 확인해 보세요."],
  },
  buzz: {
    title: "반짝 화제, 아직 안 팔려요",
    icon: Lightbulb,
    colors: "bg-[#fffbe8] text-[#daaa28]",
    description: ["검색은 늘었는데 구매는 그만큼 늘지 않았어요.", "광고비를 쓰기 전에 며칠 더 지켜보세요."],
  },
  declining: {
    title: "관심이 식어가는 중",
    icon: TrendingDown,
    colors: "bg-[#ffe6ec] text-rise",
    description: ["검색도 구매도 크게 늘지 않고 있어요.", "지금은 다른 후보를 먼저 보는 게 좋아요."],
  },
  quiet: {
    title: "소리없이 잘 팔리는 시장",
    icon: TrendingUp,
    colors: "bg-fall-bg text-fall",
    description: ["검색은 크게 늘지 않았지만 구매는 늘고 있어요.", "남들 눈에 덜 띈 수요일 수 있어요. 마진부터 확인해 보세요."],
  },
} satisfies Record<ShoppingReaction, { title: string; icon: typeof Check; colors: string; description: string[] }>;

interface ShoppingReactionCardProps {
  searchChange: number;
  shoppingChange: number | null;
}

export default function ShoppingReactionCard({ searchChange, shoppingChange }: ShoppingReactionCardProps) {
  if (shoppingChange === null) {
    return (
      <section aria-label="쇼핑 반응" className="rounded-xl bg-back p-4">
        <h3 className="text-xs leading-[14px] font-medium text-black1">쇼핑 반응 - 분야를 고르면 보여드려요</h3>
        <p className="mt-2 text-xs leading-4 font-medium tracking-[-0.2px] text-gray2">
          네이버 쇼핑 클릭 추이는 분야 코드가 있어야 조회할 수 있어요.<br />
          고르지 않으면 점수에서 이 항목을 빼고 계산해요.<br />
          지금은 검색 추이({formatChange(searchChange)})만 보고 판단해 주세요.
        </p>
      </section>
    );
  }

  const reaction = REACTIONS[getShoppingReaction(searchChange, shoppingChange)];
  const Icon = reaction.icon;

  return (
    <section aria-label="쇼핑 반응" className={`rounded-xl p-4 ${reaction.colors}`}>
      <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
        <h3 className="flex items-center gap-0.5 text-xs leading-[14px] font-bold">
          {reaction.title}<Icon size={14} aria-hidden />
        </h3>
        <p className="whitespace-nowrap text-xs leading-[14px] font-medium">
          검색 <strong className="font-semibold">{formatChange(searchChange).slice(0, -1)}</strong>% · 쇼핑 <strong className="font-semibold">{formatChange(shoppingChange).slice(0, -1)}</strong>%
        </p>
      </div>
      <p className="mt-3 text-xs leading-4 font-medium text-black1">
        {reaction.description[0]}<br />{reaction.description[1]}
      </p>
      <p className="mt-0.5 text-[10px] leading-4 font-medium text-graytext1">*작년 같은 시기 대비</p>
    </section>
  );
}
