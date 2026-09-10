import { useEffect } from "react";
import { useNavigate } from "react-router";
import logoMark from "../../assets/auth/logo.svg";

/* 스플래시 — 잠시 노출 후 로그인으로 자동 이동
   replace로 이동해 로그인에서 뒤로가기 시 스플래시가 아닌 이전 화면으로 돌아갑니다 */

const DURATION_MS = 1500;

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/login", { replace: true }), DURATION_MS);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-dark">
      <img src={logoMark} alt="Chozy" className="w-28 h-28" />
    </div>
  );
}
