import { useState } from "react";
import { useNavigate } from "react-router";
import logo from "../../assets/home/logo.svg";
import naverIcon from "../../assets/auth/naver.svg";
import kakaoIcon from "../../assets/auth/kakao.svg";
import InputBox from "../../components/common/InputBox";
import Toast from "../../components/common/Toast";
import AuthButton from "../../components/auth/AuthButton";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  /* 아이디·비밀번호가 각각 1자 이상일 때 활성 */
  const canSubmit = id.length > 0 && password.length > 0;

  /* 인증 API 연동 전까지는 실패 토스트만 노출 */
  const handleLogin = () => setError(true);

  return (
    <div className="min-h-screen bg-white px-4 pb-10">
      {/* 로고 + 태그라인 */}
      <div className="pt-20 flex flex-col justify-start items-center gap-3">
        <img src={logo} alt="Chozy" className="w-[130px]" />
        <p className="text-sm font-medium text-neutral-500">모든 저가 플랫폼을 한 눈에</p>
      </div>

      {/* 입력 */}
      <div className="mt-24 flex flex-col justify-start items-start gap-6">
        <InputBox
          label="아이디"
          placeholder="아이디를 입력해주세요."
          value={id}
          onChange={setId}
          className="self-stretch"
          autoComplete="username"
        />
        <InputBox
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={setPassword}
          className="self-stretch"
          autoComplete="current-password"
        />
      </div>

      {/* 로그인 · 회원가입 */}
      <div className="mt-[34px] flex flex-col justify-start items-start gap-3">
        <AuthButton disabled={!canSubmit} onClick={handleLogin}>
          로그인
        </AuthButton>
        <AuthButton variant="secondary" onClick={() => navigate("/signup")}>
          회원가입
        </AuthButton>
      </div>

      {/* 소셜 로그인 */}
      <div className="mt-[60px] flex justify-center items-center gap-2">
        <button type="button" aria-label="네이버로 로그인">
          <img src={naverIcon} alt="" className="w-12 h-12" />
        </button>
        <button type="button" aria-label="카카오로 로그인">
          <img src={kakaoIcon} alt="" className="w-12 h-12" />
        </button>
      </div>

      {/* 둘러보기 */}
      <div className="mt-[60px] flex justify-center">
        <button type="button" onClick={() => navigate("/")} className="text-sm font-medium text-gold underline">
          로그인 없이 둘러볼게요.
        </button>
      </div>

      <Toast
        open={error}
        onClose={() => setError(false)}
        message="아이디 또는 비밀번호가 올바르지 않아요."
      />
    </div>
  );
}
