import { Home, Search, Heart, User } from "lucide-react";

const ITEMS = [
  { key: "home", label: "홈", icon: Home },
  { key: "search", label: "검색", icon: Search },
  { key: "wishlist", label: "관심", icon: Heart },
  { key: "mypage", label: "마이", icon: User },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-md bg-white border-t border-stone-200">
      <div className="flex justify-around py-2">
        {ITEMS.map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => onChange?.(key)} className="flex flex-col items-center gap-0.5 px-4 py-1">
            <Icon size={20} strokeWidth={2} className={active === key ? "text-primary" : "text-stone-400"} />
            <span className={`text-[11px] ${active === key ? "text-primary font-medium" : "text-stone-400"}`}>
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
