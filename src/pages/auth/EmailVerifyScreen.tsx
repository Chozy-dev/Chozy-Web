import ContactVerifyScreen from "./ContactVerifyScreen";

/* 회원가입 3단계 — 이메일 인증
   이메일: 공백 불가. '@'가 하나 있고 앞뒤로 1자 이상이면 '인증번호 받기' 활성 */

const EMAIL_PATTERN = /^[^@]+@[^@]+$/;

export default function EmailVerifyScreen() {
  return (
    <ContactVerifyScreen
      title="이메일 주소를"
      label="이메일"
      placeholder="이메일을 입력해주세요."
      inputMode="email"
      autoComplete="email"
      normalize={(v) => v.replace(/\s/g, "")}
      isValid={(v) => EMAIL_PATTERN.test(v)}
    />
  );
}
