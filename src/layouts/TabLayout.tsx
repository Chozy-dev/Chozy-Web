import { Outlet, useLocation, useNavigate } from "react-router";
import BottomNav, { type TabKey } from "../components/common/BottomNav";

/* 하단 탭이 있는 화면들의 레이아웃 — 경로로 활성 탭을 판단 */

const TAB_PATH: Record<TabKey, string> = {
  home: "/",
  search: "/search",
  wishlist: "/wishlist",
  mypage: "/mypage",
};

const TAB_KEYS = Object.keys(TAB_PATH) as TabKey[];

export default function TabLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const active = TAB_KEYS.find((k) => TAB_PATH[k] === pathname) ?? "home";

  return (
    <>
      <Outlet />
      <BottomNav active={active} onChange={(key) => navigate(TAB_PATH[key])} />
    </>
  );
}
