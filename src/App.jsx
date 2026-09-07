import { useState } from "react";
import HomeScreen from "./pages/home/HomeScreen";
import BottomNav from "./components/common/BottomNav";

const PLACEHOLDER_LABEL = { search: "검색", wishlist: "관심상품", mypage: "마이페이지" };

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-stone-100 flex justify-center">
      <div className="w-full max-w-md bg-stone-100 min-h-screen relative">
        {activeTab === "home" ? (
          <HomeScreen goSearch={() => setActiveTab("search")} goWishlist={() => setActiveTab("wishlist")} />
        ) : (
          <div className="flex items-center justify-center h-screen">
            <p className="text-sm text-stone-400">{PLACEHOLDER_LABEL[activeTab]} 화면 준비 중</p>
          </div>
        )}
        <BottomNav active={activeTab} onChange={setActiveTab} />
      </div>
    </div>
  );
}
