import { useState } from "react";
import { Bell, Filter } from "lucide-react";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import PopularKeywordHub from "./PopularKeywordHub";
import NotificationsView from "./NotificationsView";
import ChangeFilterModal from "./ChangeFilterModal";
import { getSubTier } from "../../lib/score";
import { AI_PICKS, SEASON_THEMES, WISHLIST_CHANGES, NEW_PRODUCTS } from "../../data/home";

export default function HomeScreen({ goSearch, goWishlist }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
    <div className="px-4 pt-5 pb-24">
      {/* 헤더 */}
      <header className="flex items-center justify-between mb-1">
        <h1 className="text-lg font-bold text-stone-900">Chozy</h1>
        <button onClick={() => setShowNotifications(true)} className="relative">
          <Bell size={20} className="text-stone-500" />
          <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center">
            3
          </span>
        </button>
      </header>
      <p className="text-[11px] text-stone-400 mb-4">내부 진단부터 판매 전략·준비까지, 사입 확신을 드려요</p>

      {/* 무료 리포트 배너 */}
      <div className="flex items-center justify-between bg-white border border-stone-200 rounded-lg px-3 py-2.5 mb-4">
        <p className="text-xs text-stone-700">이번 달 무료 레포트 1/1 사용</p>
        <button className="text-xs font-medium text-primary">구독하기 →</button>
      </div>

      {/* URL 분석 진입 검색바 */}
      <button
        onClick={goSearch}
        className="w-full text-left bg-white border border-stone-200 rounded-full px-4 py-2.5 mb-6 text-sm text-stone-400"
      >
        상품 URL을 붙여넣어 분석해보세요
      </button>

      {/* 인기 키워드 허브 */}
      <PopularKeywordHub goSearch={goSearch} />

      {/* 오늘의 AI 추천 상품 */}
      <section className="mb-6">
        <p className="text-sm font-semibold text-stone-800 mb-2.5">오늘의 AI 추천 상품</p>
        <div className="flex gap-2 overflow-x-auto">
          {AI_PICKS.map((p) => {
            const tier = getSubTier(p.score);
            return (
              <button key={p.name} className="flex-none w-32 bg-white border border-stone-200 rounded-lg p-2 text-left">
                <div className="w-full h-16 rounded bg-stone-100 mb-1.5" />
                <p className="text-[11px] text-stone-800 truncate mb-0.5">{p.name}</p>
                <p className="text-[11px] text-stone-500 mb-1">{p.price}</p>
                <Badge tone={tier.tone}>{p.score}점</Badge>
                <p className="text-[10px] text-stone-400 mt-1 leading-snug">{p.note}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 시즌 테마 상품 */}
      <section className="mb-6">
        <p className="text-sm font-semibold text-stone-800 mb-2.5">시즌 테마 상품</p>
        <div className="space-y-2">
          {SEASON_THEMES.map((t) => (
            <button key={t} className="w-full text-left">
              <Card className="px-3 py-3 flex items-center justify-between">
                <span className="text-sm text-stone-800">{t}</span>
                <span className="text-xs text-primary">보기 →</span>
              </Card>
            </button>
          ))}
        </div>
      </section>

      {/* 관심상품 변동 사항 */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-sm font-semibold text-stone-800">관심상품 변동 사항</p>
          <button onClick={() => setFilterOpen(true)} className="text-stone-400">
            <Filter size={16} />
          </button>
        </div>
        <Card>
          {WISHLIST_CHANGES.map((w, i, arr) => (
            <button
              key={w.name}
              onClick={goWishlist}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-left ${
                i !== arr.length - 1 ? "border-b border-stone-100" : ""
              }`}
            >
              <div className="min-w-0">
                <p className="text-sm text-stone-800 truncate">{w.name}</p>
                <p className="text-[11px] text-stone-400">
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
        <p className="text-sm font-semibold text-stone-800 mb-2.5">신규 등록 상품</p>
        <div className="flex gap-2 overflow-x-auto">
          {NEW_PRODUCTS.map((p) => (
            <button key={p.name} className="flex-none w-28 bg-white border border-stone-200 rounded-lg p-2 text-left">
              <div className="w-full h-16 rounded bg-stone-100 mb-1.5" />
              <p className="text-[11px] text-stone-800 truncate mb-0.5">{p.name}</p>
              <p className="text-[11px] text-stone-500">{p.price}</p>
            </button>
          ))}
        </div>
      </section>

      {/* 최근 본 상품 */}
      <section>
        <p className="text-sm font-semibold text-stone-800 mb-2.5">최근 본 상품</p>
        <Card className="py-8 text-center">
          <p className="text-xs text-stone-400">최근 본 상품이 없어요</p>
        </Card>
      </section>

      <ChangeFilterModal open={filterOpen} onClose={() => setFilterOpen(false)} />
    </div>

    {/* 알림 오버레이 */}
    {showNotifications && (
      <div className="fixed inset-0 z-50 bg-black/40 flex justify-center" onClick={() => setShowNotifications(false)}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md relative m-4 bg-stone-50 rounded-2xl overflow-y-auto shadow-xl"
        >
          <NotificationsView onBack={() => setShowNotifications(false)} />
        </div>
      </div>
    )}
    </>
  );
}
