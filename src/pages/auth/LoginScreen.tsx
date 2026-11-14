import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import logo from "../../assets/home/logo.svg";
import InputBox from "../../components/common/InputBox";
import Toast from "../../components/common/Toast";
import AuthButton from "../../components/auth/AuthButton";
import { useAuthSession } from "../../auth/AuthSession";

export default function LoginScreen() {
  const navigate = useNavigate();
  const { signIn } = useAuthSession();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const canSubmit = import.meta.env.DEV && id.length > 0 && password.length > 0;

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    if (signIn(id, password)) {
      navigate("/", { replace: true });
      return;
    }
    setError(true);
  }

  return (
    <div className="min-h-screen bg-white px-4 pb-10">
      {/* 로고 + 태그라인 */}
      <div className="pt-20 flex flex-col justify-start items-center gap-3">
        <img src={logo} alt="Chozy" className="w-[130px]" />
        <p className="text-sm font-medium text-neutral-500">모든 저가 플랫폼을 한 눈에</p>
      </div>

      <form onSubmit={handleLogin}>
        <div className="mt-24 flex flex-col justify-start items-start gap-6">
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

        <div className="mt-[34px] flex flex-col justify-start items-start gap-3">
          <AuthButton type="submit" disabled={!canSubmit}>
            {import.meta.env.DEV ? "로그인" : "로그인 준비 중"}
          </AuthButton>
          <AuthButton variant="secondary" onClick={() => navigate("/signup")}>
            회원가입
          </AuthButton>
        </div>
      </form>

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
