import { BrowserRouter, Route, Routes } from "react-router";
import AppShell from "./layouts/AppShell";
import TabLayout from "./layouts/TabLayout";
import HomeScreen from "./pages/home/HomeScreen";
import NotificationsView from "./pages/notifications/NotificationsView";
import SplashScreen from "./pages/auth/SplashScreen";
import Placeholder from "./pages/Placeholder";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          {/* 하단 탭이 있는 화면 */}
          <Route element={<TabLayout />}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/search" element={<Placeholder label="검색" />} />
            <Route path="/wishlist" element={<Placeholder label="관심상품" />} />
            <Route path="/mypage" element={<Placeholder label="마이페이지" />} />
          </Route>

          {/* 탭 없이 전체 화면으로 뜨는 화면 */}
          <Route path="/notifications" element={<NotificationsView />} />
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/login" element={<Placeholder label="로그인" />} />

          <Route path="*" element={<Placeholder label="찾을 수 없는" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
