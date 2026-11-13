import type { CSSProperties } from "react";
import homeIcon from "../../assets/bottom-nav/home.svg";
import searchIcon from "../../assets/bottom-nav/search.svg";
import listIcon from "../../assets/bottom-nav/list.svg";
import userIcon from "../../assets/bottom-nav/user.svg";

export type TabKey = "home" | "search" | "wishlist" | "mypage";

const ITEMS: { key: TabKey; label: string; icon: string }[] = [
  { key: "home", label: "홈", icon: homeIcon },
  { key: "search", label: "검색", icon: searchIcon },
  { key: "wishlist", label: "관심", icon: listIcon },
  { key: "mypage", label: "마이", icon: userIcon },
];

/* SVG를 mask로 깔고 currentColor로 칠해 활성/비활성 색을 한 파일로 처리 */
function MaskIcon({ src, className = "" }: { src: string; className?: string }) {
  const style: CSSProperties = {
    WebkitMaskImage: `url("${src}")`,
    maskImage: `url("${src}")`,
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    backgroundColor: "currentColor",
  };
  return <span aria-hidden className={`inline-block ${className}`} style={style} />;
}

interface BottomNavProps {
  active: TabKey;
  compact?: boolean;
  onChange?: (key: TabKey) => void;
}

export default function BottomNav({ active, compact = false, onChange }: BottomNavProps) {
  return (
    <nav
      aria-label="하단 메뉴"
      className={`fixed inset-x-0 bottom-0 mx-auto max-w-md bg-white ${
        compact
          ? "pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-4px_10px_rgba(0,0,0,0.04)]"
          : "border-t border-gray-100"
      }`}
    >
      <div className={compact ? "flex min-h-[var(--compact-tab-bar-height)]" : "flex justify-around pt-2 pb-3"}>
        {ITEMS.map(({ key, label, icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              type="button"
              aria-current={isActive ? "page" : undefined}
              onClick={() => onChange?.(key)}
              className={`flex flex-col items-center ${
                compact ? "min-w-0 flex-1 justify-center gap-0.5 py-2" : "gap-1 px-4 py-0.5"
              }`}
            >
              <MaskIcon
                src={icon}
                className={`size-7 shrink-0 ${isActive ? "text-primary-dark" : compact ? "text-[#cdcdcd]" : "text-gray-300"}`}
              />
              <span
                className={`text-xs ${compact ? "leading-[14px] font-normal" : isActive ? "font-bold" : ""} ${
                  isActive ? "text-primary-dark" : compact ? "text-gray1" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
