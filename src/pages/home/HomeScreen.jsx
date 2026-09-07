import { Bell, Filter } from "lucide-react";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import PopularKeywordHub from "./PopularKeywordHub";
import { getSubTier } from "../../lib/score";
import { AI_PICKS, SEASON_THEMES, WISHLIST_CHANGES, NEW_PRODUCTS } from "../../data/home";

export default function HomeScreen() {
  return (
    <div className="px-4 pt-5 pb-24">
      {/* 헤더 */}
      <header className="flex items-center justify-between mb-1">
        <h1>Chozy</h1>
        <button className="relative">
          <Bell size={20} />
          <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 rounded-full flex items-center justify-center">3</span>
        </button>
      </header>
      <p className="mb-4">내부 진단부터 판매 전략·준비까지, 사입 확신을 드려요</p>

      {/* 무료 리포트 배너 */}
      <div className="flex items-center justify-between border rounded-lg px-3 py-2.5 mb-4">
        <p>이번 달 무료 레포트 1/1 사용</p>
        <button>구독하기 →</button>
      </div>

      {/* URL 분석 진입 검색바 */}
      <button className="w-full text-left border rounded-full px-4 py-2.5 mb-6">
        상품 URL을 붙여넣어 분석해보세요
      </button>

      {/* 인기 키워드 허브 */}
      <PopularKeywordHub />

      {/* 오늘의 AI 추천 상품 */}
      <section className="mb-6">
        <p className="mb-2.5">오늘의 AI 추천 상품</p>
        <div className="flex gap-2 overflow-x-auto">
          {AI_PICKS.map((p) => {
            const tier = getSubTier(p.score);
            return (
              <button key={p.name} className="flex-none w-32 border rounded-lg p-2 text-left">
                <div className="w-full h-16 rounded mb-1.5" />
                <p className="truncate mb-0.5">{p.name}</p>
                <p className="mb-1">{p.price}</p>
                <Badge tone={tier.tone}>{p.score}점</Badge>
                <p className="mt-1">{p.note}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 시즌 테마 상품 */}
      <section className="mb-6">
        <p className="mb-2.5">시즌 테마 상품</p>
        <div className="space-y-2">
          {SEASON_THEMES.map((t) => (
            <button key={t} className="w-full text-left">
              <Card className="px-3 py-3 flex items-center justify-between">
                <span>{t}</span>
                <span>보기 →</span>
              </Card>
            </button>
          ))}
        </div>
      </section>

      {/* 관심상품 변동 사항 */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <p>관심상품 변동 사항</p>
          <button>
            <Filter size={16} />
          </button>
        </div>
        <Card>
          {WISHLIST_CHANGES.map((w, i, arr) => (
            <button
              key={w.name}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-left ${i !== arr.length - 1 ? "border-b" : ""}`}
            >
              <div className="min-w-0">
                <p className="truncate">{w.name}</p>
                <p>
                  {w.price} · {w.sub}
                </p>
              </div>
              <Badge tone={w.primaryTone}>{w.primary}</Badge>
            </button>
          ))}
        </Card>
      </section>

      {/* 신규 등록 상품 */}
      <section className="mb-6">
        <p className="mb-2.5">신규 등록 상품</p>
        <div className="flex gap-2 overflow-x-auto">
          {NEW_PRODUCTS.map((p) => (
            <button key={p.name} className="flex-none w-28 border rounded-lg p-2 text-left">
              <div className="w-full h-16 rounded mb-1.5" />
              <p className="truncate mb-0.5">{p.name}</p>
              <p>{p.price}</p>
            </button>
          ))}
        </div>
      </section>

      {/* 최근 본 상품 */}
      <section>
        <p className="mb-2.5">최근 본 상품</p>
        <Card className="py-8 text-center">
          <p>최근 본 상품이 없어요</p>
        </Card>
      </section>
    </div>
  );
}
