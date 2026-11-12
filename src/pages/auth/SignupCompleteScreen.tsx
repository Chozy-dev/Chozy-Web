import { useNavigate } from "react-router";
import niceIcon from "../../assets/auth/nice.svg";
import AuthButton from "../../components/auth/AuthButton";

/* 회원가입 완료 — '확인'을 누르면 로그인 화면으로
   가입 절차로 되돌아가지 않도록 기록을 교체하며 이동 */

export default function SignupCompleteScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col px-4 pb-10">
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="w-40 h-40 rounded-full bg-stone-50 flex items-center justify-center">
          <img src={niceIcon} alt="" className="w-[100px] h-[100px]" />
        </div>
        <p className="text-lg font-semibold leading-7 text-zinc-900">회원가입을 완료했어요.</p>
      </div>

      <div className="flex flex-col">
        <AuthButton onClick={() => navigate("/login", { replace: true })}>확인</AuthButton>
      </div>
    </div>
  );
}
