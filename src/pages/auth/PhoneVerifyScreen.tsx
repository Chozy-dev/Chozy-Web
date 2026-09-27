import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import backArrow from "../../assets/common/back-arrow.svg";
import checkSuccess from "../../assets/auth/check-circle-success.svg";
import InputBox from "../../components/common/InputBox";
import InputActionButton from "../../components/common/InputActionButton";
import AuthButton from "../../components/auth/AuthButton";
import Toast from "../../components/common/Toast";

/* 회원가입 3단계 — 휴대폰 번호 인증
   번호: 숫자만, 최대 11자. 10~11자일 때 '인증번호 받기' 활성, 클릭 후 3초 쿨다운(연타 방지)
   인증번호: 숫자만 6자, 유효시간 5분. 발송 후 1자라도 입력되면 '인증하기' 활성
   인증 성공 시 두 버튼이 '인증완료'로 바뀌고 '다음' 활성. 번호를 고치면 처음부터 다시 */

const PHONE_MAX = 11;
const PHONE_MIN = 10;
const CODE_LENGTH = 6;
const RESEND_COOLDOWN_MS = 3000;
const CODE_TTL_MS = 5 * 60 * 1000;

/* 인증 API 연동 전 임시 — 어떤 번호든 아래 코드면 통과 (Figma 예시 123456, 개발용 111111) */
const MOCK_CODES = ["123456", "111111"];

const digitsOnly = (v: string, max: number) => v.replace(/\D/g, "").slice(0, max);

const formatRemaining = (ms: number) => {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const m = String(Math.floor(total / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${m}:${s}`;
};

type ToastKind = "fail" | "success" | null;

export default function PhoneVerifyScreen() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  /** 인증번호 만료 시각 — null이면 아직 발송 전 */
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [coolingDown, setCoolingDown] = useState(false);
  const [verified, setVerified] = useState(false);
  const [toast, setToast] = useState<ToastKind>(null);

  useEffect(() => {
    if (!coolingDown) return;
    const timer = setTimeout(() => setCoolingDown(false), RESEND_COOLDOWN_MS);
    return () => clearTimeout(timer);
  }, [coolingDown]);

  /* 발송 후에는 1초마다 남은 시간 갱신, 인증 완료·만료 시 중단 */
  const sent = expiresAt !== null;
  const remaining = sent ? expiresAt - now : 0;
  const expired = sent && remaining <= 0;
  useEffect(() => {
    if (!sent || verified || expired) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [sent, verified, expired]);

  const canSend = phone.length >= PHONE_MIN && !coolingDown && !verified;
  const canVerify = sent && !expired && code.length > 0 && !verified;

  const handleSend = () => {
    setNow(Date.now());
    setExpiresAt(Date.now() + CODE_TTL_MS);
    setCode("");
    setCoolingDown(true);
  };

  const handleVerify = () => {
    if (MOCK_CODES.includes(code)) {
      setVerified(true);
      setToast("success");
    } else {
      setToast("fail");
    }
  };

  /* 번호를 바꾸면 이전 인증은 무효 — 다시 발송부터 */
  const handlePhoneChange = (v: string) => {
    setPhone(digitsOnly(v, PHONE_MAX));
    setExpiresAt(null);
    setCode("");
    setVerified(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-4 pb-10">
      <header className="h-12 -mx-4 px-4 flex items-center">
        <button onClick={() => navigate(-1)} aria-label="뒤로" className="w-6 h-6 flex items-center justify-center">
          <img src={backArrow} alt="" className="w-5 h-5" />
        </button>
      </header>

      <h1 className="mt-3 text-xl font-semibold leading-7 text-zinc-900">
        휴대폰 번호를
        <br />
        입력해주세요.
      </h1>

      {/* 입력 — 제목과 40px 간격(Figma) */}
      <div className="mt-10 flex flex-col gap-6">
        <InputBox
          label="휴대폰 번호"
          placeholder="휴대폰 번호를 입력해주세요."
          value={phone}
          onChange={handlePhoneChange}
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={PHONE_MAX}
          clearable={!verified}
          className="self-stretch"
          action={
            <InputActionButton done={verified} disabled={!canSend} onClick={handleSend}>
              인증번호 받기
            </InputActionButton>
          }
        />
        <InputBox
          label="인증 번호"
          placeholder="인증 번호를 입력해주세요."
          value={code}
          onChange={(v) => setCode(digitsOnly(v, CODE_LENGTH))}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={CODE_LENGTH}
          readOnly={verified}
          className="self-stretch"
          action={
            <InputActionButton done={verified} disabled={!canVerify} onClick={handleVerify}>
              인증하기
            </InputActionButton>
          }
          helper={
            sent &&
            !verified && (
              <p className="text-sm font-medium text-blue-500">남은 시간 {formatRemaining(remaining)}</p>
            )
          }
        />
      </div>

      {/* 다음 */}
      <div className="mt-auto pt-10 flex flex-col">
        <AuthButton disabled={!verified} onClick={() => navigate("/signup/form")}>
          다음
        </AuthButton>
      </div>

      <Toast
        open={toast !== null}
        onClose={() => setToast(null)}
        bottom="above-button"
        icon={toast === "success" ? <img src={checkSuccess} alt="" className="w-6 h-6 flex-shrink-0" /> : undefined}
        message={toast === "success" ? "인증을 완료했어요." : "인증 번호를 다시 확인해주세요."}
      />
    </div>
  );
}
