import { useState } from "react";
import HomeScreen from "./pages/home/HomeScreen";
import BottomNav, { type TabKey } from "./components/common/BottomNav";

const PLACEHOLDER_LABEL: Record<Exclude<TabKey, "home">, string> = {
  search: "검색",
  wishlist: "관심상품",
  mypage: "마이페이지",
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");

  return (
    <div className="min-h-screen bg-page flex justify-center">
      <div className="w-full max-w-md bg-page min-h-screen relative">
        {activeTab === "home" ? (
          <HomeScreen goSearch={() => setActiveTab("search")} />
        ) : (
          <div className="flex items-center justify-center h-screen">
            <p className="text-sm text-gray-400">{PLACEHOLDER_LABEL[activeTab]} 화면 준비 중</p>
          </div>
        )}
        <BottomNav active={activeTab} onChange={setActiveTab} />
      </div>
    </div>
  );
}
