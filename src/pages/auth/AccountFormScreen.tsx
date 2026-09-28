import { useState } from "react";
import { useNavigate } from "react-router";
import backArrow from "../../assets/common/back-arrow.svg";
import checkSuccess from "../../assets/auth/check-circle-success.svg";
import InputBox from "../../components/common/InputBox";
import InputActionButton from "../../components/common/InputActionButton";
import AuthButton from "../../components/auth/AuthButton";
import Toast from "../../components/common/Toast";

/* 회원가입 4단계 — 아이디·비밀번호 입력
   아이디: 영어 소문자·숫자·'_'만, 8~12자, 공백 불가. 형식이 맞으면 '중복확인' 활성, 고치면 다시 확인
   중복확인 결과는 토스트로 안내 (사용 가능 / 이미 사용 중)
   비밀번호: 8~16자, 영어+숫자 포함. 기본은 '*'로 가림
   조건 안내는 입력값이 있고 조건에 안 맞을 때만 노출
   아이디 중복확인 + 비밀번호 조건 + 확인 일치 시 '다음' 활성 */

const ID_MIN = 8;
const ID_MAX = 12;
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 16;

/* 중복확인 API 연동 전 임시 — 아래 아이디는 이미 사용 중으로 처리 */
const MOCK_TAKEN_IDS = ["chozy_admin", "testuser1"];

const hasValidIdChars = (v: string) => /^[a-z0-9_]*$/.test(v);
const isValidId = (v: string) => v.length >= ID_MIN && hasValidIdChars(v);
const isValidPassword = (v: string) => v.length >= PASSWORD_MIN && /[a-zA-Z]/.test(v) && /\d/.test(v);

/* 공백은 입력 자체를 막고 최대 길이에서 자름. 비밀번호는 영문 키보드 문자만 */
const normalizeId = (v: string) => v.replace(/\s/g, "").slice(0, ID_MAX);
const normalizePassword = (v: string) => v.replace(/[^\x21-\x7E]/g, "").slice(0, PASSWORD_MAX);

function ErrorText({ lines }: { lines: string[] }) {
  return (
    <div className="text-sm font-medium text-red-500">
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}

type IdCheck = "unchecked" | "available" | "taken";
type ToastKind = "available" | "taken" | null;

export default function AccountFormScreen() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [idCheck, setIdCheck] = useState<IdCheck>("unchecked");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [toast, setToast] = useState<ToastKind>(null);

  const idValid = isValidId(id);
  const passwordValid = isValidPassword(password);
  const passwordMatch = passwordConfirm === password;
  const canNext = idCheck === "available" && passwordValid && passwordConfirm.length > 0 && passwordMatch;

  const handleIdChange = (v: string) => {
    setId(normalizeId(v));
    setIdCheck("unchecked");
  };

  const handleIdCheck = () => {
    const result = MOCK_TAKEN_IDS.includes(id) ? "taken" : "available";
    setIdCheck(result);
    setToast(result);
  };

  /* 글자수만 안 맞으면 한 줄, 쓸 수 없는 문자(대문자 등)가 있으면 문자 조건까지 두 줄 */
  const idError =
    id.length === 0 || idValid
      ? null
      : hasValidIdChars(id)
        ? ["아이디는 8자 이상, 12자 이하로 입력해주세요."]
        : ["아이디는 8자 이상, 12자 이하로 입력해주세요.", "숫자, 영어 소문자, '_'만 사용할 수 있어요."];

  /* 비밀번호 입력칸 공통 — iOS 자동 대문자·자동 수정 끄기 */
  const passwordInputProps = {
    type: "password" as const,
    mask: "*",
    autoCapitalize: "off",
    autoCorrect: "off",
    spellCheck: false,
    className: "self-stretch",
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-4 pb-10">
      <header className="h-12 -mx-4 px-4 flex items-center">
        <button onClick={() => navigate(-1)} aria-label="뒤로" className="w-6 h-6 flex items-center justify-center">
          <img src={backArrow} alt="" className="w-5 h-5" />
        </button>
      </header>

      <h1 className="mt-3 text-xl font-semibold leading-7 text-zinc-900">
        아이디와 비밀번호를
        <br />
        입력해주세요.
      </h1>

      {/* 입력 — 제목과 40px 간격(Figma) */}
      <div className="mt-10 flex flex-col gap-6">
        <InputBox
          label="아이디"
          placeholder="아이디를 입력해주세요."
          value={id}
          onChange={handleIdChange}
          autoComplete="username"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          className="self-stretch"
          action={
            <InputActionButton
              done={idCheck === "available"}
              doneLabel="중복확인"
              disabled={!idValid || idCheck !== "unchecked"}
              onClick={handleIdCheck}
            >
              중복확인
            </InputActionButton>
          }
          helper={idError && <ErrorText lines={idError} />}
        />
        <InputBox
          {...passwordInputProps}
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(v) => setPassword(normalizePassword(v))}
          autoComplete="new-password"
          helper={
            password.length > 0 &&
            !passwordValid && (
              <ErrorText lines={["비밀번호는 8자 이상, 16자 이하로 입력해주세요.", "영어, 숫자를 포함해주세요."]} />
            )
          }
        />
        <InputBox
          {...passwordInputProps}
          label="비밀번호 확인"
          placeholder="비밀번호를 한 번 더 입력해주세요."
          value={passwordConfirm}
          onChange={(v) => setPasswordConfirm(normalizePassword(v))}
          autoComplete="new-password"
          helper={passwordConfirm.length > 0 && !passwordMatch && <ErrorText lines={["비밀번호가 일치하지 않아요."]} />}
        />
      </div>

      {/* 다음 */}
      <div className="mt-auto pt-10 flex flex-col">
        <AuthButton disabled={!canNext} onClick={() => navigate("/signup/profile")}>
          다음
        </AuthButton>
      </div>

      <Toast
        open={toast !== null}
        onClose={() => setToast(null)}
        bottom="above-button"
        icon={toast === "available" ? <img src={checkSuccess} alt="" className="w-6 h-6 flex-shrink-0" /> : undefined}
        message={toast === "available" ? "사용할 수 있는 아이디에요." : "이미 사용 중인 아이디에요."}
      />
    </div>
  );
}
