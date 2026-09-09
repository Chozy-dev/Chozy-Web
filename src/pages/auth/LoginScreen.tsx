import { useState } from "react";
import { useNavigate } from "react-router";
import logo from "../../assets/home/logo.svg";
import naverIcon from "../../assets/auth/naver.svg";
import kakaoIcon from "../../assets/auth/kakao.svg";
import InputBox from "../../components/common/InputBox";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = id.trim() !== "" && password.trim() !== "";

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
          onChange={(e) => setId(e.target.value)}
          className="self-stretch"
          autoComplete="username"
        />
        <InputBox
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="self-stretch"
          autoComplete="current-password"
        />
      </div>

      {/* 로그인 · 회원가입 */}
      <div className="mt-[34px] flex flex-col justify-start items-start gap-3">
        <button
          type="button"
          disabled={!canSubmit}
          className={`self-stretch h-12 p-2.5 rounded-sm flex justify-center items-center text-base font-medium text-white ${
            canSubmit ? "bg-primary-dark" : "bg-zinc-300"
          }`}
        >
          로그인
        </button>
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="self-stretch h-12 px-4 py-2.5 bg-stone-50 rounded-sm flex justify-center items-center text-base font-medium text-zinc-600"
        >
          회원가입
        </button>
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
    </div>
  );
}
