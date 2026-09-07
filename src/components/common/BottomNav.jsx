import homeIcon from "../../assets/bottom-nav/home.svg";
import searchIcon from "../../assets/bottom-nav/search.svg";
import listIcon from "../../assets/bottom-nav/list.svg";
import userIcon from "../../assets/bottom-nav/user.svg";

const ITEMS = [
  { key: "home", label: "홈", icon: homeIcon },
  { key: "search", label: "검색", icon: searchIcon },
  { key: "wishlist", label: "관심", icon: listIcon },
  { key: "mypage", label: "마이", icon: userIcon },
];

/* SVG를 mask로 깔고 currentColor로 칠해 활성/비활성 색을 한 파일로 처리 */
function MaskIcon({ src, className = "" }) {
  const style = {
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

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-md bg-white border-t border-gray-100">
      <div className="flex justify-around pt-2 pb-3">
        {ITEMS.map(({ key, label, icon }) => {
          const isActive = active === key;
          return (
            <button key={key} onClick={() => onChange?.(key)} className="flex flex-col items-center gap-1 px-4 py-0.5">
              <MaskIcon src={icon} className={`w-7 h-7 ${isActive ? "text-primary-dark" : "text-gray-300"}`} />
              <span className={`text-[10px] ${isActive ? "text-primary-dark font-semibold" : "text-gray-400"}`}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
