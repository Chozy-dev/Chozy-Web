import { useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import logo from "../../assets/home/logo.svg";
import backArrow from "../../assets/common/back-arrow.svg";
import naverIcon from "../../assets/auth/naver.svg";
import kakaoIcon from "../../assets/auth/kakao.svg";
import InputBox from "../../components/common/InputBox";
import Toast from "../../components/common/Toast";
import AuthButton from "../../components/auth/AuthButton";
import { useAuthSession } from "../../auth/AuthSession";

export default function LoginScreen() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const fromLogout = state?.fromLogout === true;
  const { signedIn, signIn } = useAuthSession();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const canSubmit = import.meta.env.DEV && id.length > 0 && password.length > 0;

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    if (!signIn(id, password)) {
      setMessage("아이디 또는 비밀번호가 올바르지 않아요.");
    }
  }

  if (signedIn) {
    const returnTo: unknown = state?.returnTo;
    const destination = typeof returnTo === "string" && /^\/(wishlist|mypage)(?:[/?#]|$)/i.test(returnTo)
      ? returnTo
      : "/";
    return <Navigate to={destination} replace />;
  }

  return (
    <div className="min-h-screen bg-white px-4 pb-10">
      {fromLogout && (
        <header className="flex h-12 items-center">
          <button
            type="button"
            aria-label="홈으로 돌아가기"
            onClick={() => navigate("/", { replace: true })}
            className="-ml-3 grid size-11 place-items-center"
          >
            <img src={backArrow} alt="" className="size-5" />
          </button>
        </header>
      )}
      {/* 로고 + 태그라인 */}
      <div className={`flex flex-col items-center ${fromLogout ? "pt-8 gap-2" : "pt-20 gap-3"}`}>
        <img src={logo} alt="Chozy" className={fromLogout ? "w-[136px]" : "w-[130px]"} />
        <p className={fromLogout ? "text-xs leading-4 font-medium text-graytext1" : "text-sm font-medium text-neutral-500"}>
          {fromLogout ? "위탁 셀러를 위한 상품 검증 플랫폼" : "모든 저가 플랫폼을 한 눈에"}
        </p>
      </div>

      <form onSubmit={handleLogin}>
        <div className={`flex flex-col items-start ${fromLogout ? "mt-[102px] gap-5" : "mt-24 gap-6"}`}>
          <InputBox
            label="아이디"
            aria-label="아이디"
            name="username"
            placeholder="아이디를 입력해주세요."
            value={id}
            onChange={setId}
            className="self-stretch"
            autoComplete="username"
          />
          <InputBox
            label="비밀번호"
            aria-label="비밀번호"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={setPassword}
            className="self-stretch"
            autoComplete="current-password"
          />
        </div>

        <div className={`flex flex-col items-start gap-3 ${fromLogout ? "mt-[38px]" : "mt-[34px]"}`}>
          <AuthButton type="submit" disabled={!canSubmit}>
            {import.meta.env.DEV ? "로그인" : "로그인 준비 중"}
          </AuthButton>
          <AuthButton variant="secondary" onClick={() => navigate("/signup")}>
            회원가입
          </AuthButton>
        </div>
      </form>

      {fromLogout && (
        <div className="mt-[60px] flex justify-center gap-2">
          <button type="button" aria-label="네이버로 로그인" onClick={() => setMessage("네이버 로그인은 준비 중이에요.")}>
            <img src={naverIcon} alt="" className="size-12" />
          </button>
          <button type="button" aria-label="카카오로 로그인" onClick={() => setMessage("카카오 로그인은 준비 중이에요.")}>
            <img src={kakaoIcon} alt="" className="size-12" />
          </button>
        </div>
      )}

      {/* 둘러보기 */}
      <div className="mt-[60px] flex justify-center">
        <button type="button" onClick={() => navigate("/", { replace: true })} className="text-sm font-medium text-gold underline">
          로그인 없이 둘러볼게요.
        </button>
      </div>

      <Toast
        open={Boolean(message)}
        onClose={() => setMessage("")}
        message={message}
      />
    </div>
  );
}
