import ContactVerifyScreen, { digitsOnly } from "./ContactVerifyScreen";

/* 회원가입 3단계 — 휴대폰 번호 인증
   번호: 숫자만, 최대 11자. 10~11자일 때 '인증번호 받기' 활성 */

const PHONE_MAX = 11;
const PHONE_MIN = 10;

export default function PhoneVerifyScreen() {
  return (
    <ContactVerifyScreen
      title="휴대폰 번호를"
      label="휴대폰 번호"
      placeholder="휴대폰 번호를 입력해주세요."
      inputMode="numeric"
      autoComplete="tel-national"
      normalize={(v) => digitsOnly(v, PHONE_MAX)}
      isValid={(v) => v.length >= PHONE_MIN}
    />
  );
}
