import { useState } from "react";
import { useNavigate } from "react-router";
import backArrow from "../../assets/common/back-arrow.svg";
import InputBox from "../../components/common/InputBox";
import AuthButton from "../../components/auth/AuthButton";
import ErrorText from "../../components/auth/ErrorText";

/* 회원가입 5단계 — 닉네임 입력
   한글·공백만, 8자 이내, 중복 허용. 조건 안내는 입력값이 있고 조건에 안 맞을 때만 노출
   (한글 조합 중 잘림을 막으려고 길이는 자르지 않고 안내만 함)
   공백만 입력한 경우는 완료 불가, 앞뒤 공백은 저장 시 제거 */

const NICKNAME_MAX = 8;

/* 조합 중 자모(ㄱ, ㅏ 등)도 한글로 인정해야 입력 도중 문구가 깜빡이지 않음 */
const hasValidNicknameChars = (v: string) => /^[가-힣ㄱ-ㅎㅏ-ㅣ ]*$/.test(v);

export default function NicknameScreen() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");

  const lengthValid = nickname.length <= NICKNAME_MAX;
  const charsValid = hasValidNicknameChars(nickname);
  const canComplete = nickname.trim().length > 0 && lengthValid && charsValid;

  const errors = [
    ...(lengthValid ? [] : ["닉네임은 8자 이내로 입력해주세요."]),
    ...(charsValid ? [] : ["한글만 사용할 수 있어요."]),
  ];

  const handleComplete = () => {
    // TODO: 회원가입 API 연동 시 nickname.trim() 전송
    navigate("/signup/complete");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-4 pb-10">
      <header className="h-12 -mx-4 px-4 flex items-center">
        <button onClick={() => navigate(-1)} aria-label="뒤로" className="w-6 h-6 flex items-center justify-center">
          <img src={backArrow} alt="" className="w-5 h-5" />
        </button>
      </header>

      <h1 className="mt-3 text-xl font-semibold leading-7 text-zinc-900">
        Chozy에서 사용할
        <br />
        닉네임을 알려주세요.
      </h1>

      {/* 입력 — 제목과 40px 간격(Figma) */}
      <div className="mt-10 flex flex-col">
        <InputBox
          label="닉네임"
          placeholder="닉네임을 입력해주세요."
          value={nickname}
          onChange={setNickname}
          autoComplete="nickname"
          className="self-stretch"
          helper={errors.length > 0 && <ErrorText lines={errors} />}
        />
      </div>

      {/* 완료 */}
      <div className="mt-auto pt-10 flex flex-col">
        <AuthButton disabled={!canComplete} onClick={handleComplete}>
          완료하기
        </AuthButton>
      </div>
    </div>
  );
}
