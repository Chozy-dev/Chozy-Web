import { Outlet } from "react-router";

/* 모든 화면 공통 모바일 컨테이너 */
export default function AppShell() {
  return (
    <div className="min-h-screen bg-page flex justify-center">
      <div className="w-full max-w-md bg-page min-h-screen relative">
        <Outlet />
      </div>
    </div>
  );
}
