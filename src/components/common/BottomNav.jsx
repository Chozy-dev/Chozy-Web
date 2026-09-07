import { Home, Search, ClipboardList, User } from "lucide-react";

const ITEMS = [
  { key: "home", label: "홈", icon: Home },
  { key: "search", label: "검색", icon: Search },
  { key: "wishlist", label: "관심", icon: ClipboardList },
  { key: "mypage", label: "마이", icon: User },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-md bg-white border-t border-gray-100">
      <div className="flex justify-around pt-2 pb-3">
        {ITEMS.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button key={key} onClick={() => onChange?.(key)} className="flex flex-col items-center gap-1 px-4 py-0.5">
              <Icon
                size={21}
                strokeWidth={isActive ? 2.4 : 1.8}
                className={isActive ? "text-primary" : "text-gray-300"}
                fill={isActive ? "currentColor" : "none"}
              />
              <span className={`text-[10px] ${isActive ? "text-primary font-semibold" : "text-gray-400"}`}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
