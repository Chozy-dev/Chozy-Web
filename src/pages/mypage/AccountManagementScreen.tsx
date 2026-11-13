import { useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { AccountActions, ManagementHeader } from "./MyPageComponents";
import { PROFILE } from "./profile";

const PROFILE_ROWS = [
  { label: "이름", value: PROFILE.name },
  { label: "닉네임", value: PROFILE.nickname },
  { label: "이메일", value: PROFILE.email },
  { label: "휴대폰 번호", value: PROFILE.maskedPhone },
];

const UPCOMING_SETTINGS = ["비밀번호 변경", "휴대폰 인증", "로그인 기기 관리", "연결 계정 관리"];

export default function AccountManagementScreen() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-dvh bg-back pb-8 text-black1">
      <ManagementHeader title="계정 관리" />

      <div className="space-y-3 pt-4 pr-[19px] pl-[13px] text-sm leading-[17px] font-medium">
        <dl aria-label="계정 정보" className="space-y-6 rounded-[18px] bg-white p-5">
          {PROFILE_ROWS.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between gap-2">
              <dt className="shrink-0 text-graytext1">{label}</dt>
              <dd className="flex min-w-0 items-center gap-1.5 text-right">
                <span className="min-w-0 wrap-anywhere">{value}</span>
                <ChevronRight size={12} strokeWidth={2.5} className="shrink-0 text-graytext1" aria-hidden />
              </dd>
            </div>
          ))}
        </dl>

        <ul aria-label="계정 설정" className="space-y-6 rounded-[18px] bg-white p-5 text-graytext1">
          {UPCOMING_SETTINGS.map((label) => (
            <li key={label} className="flex items-center justify-between gap-2">
              <span>{label}</span>
              <span className="shrink-0 text-xs leading-[14px] text-gray1">준비 중</span>
            </li>
          ))}
        </ul>

        <dl aria-label="간편 로그인" className="rounded-[18px] bg-white p-5">
          <div className="flex items-center justify-between gap-2">
            <dt>카카오톡 간편 로그인</dt>
            <dd className="shrink-0 text-rise">연동됨</dd>
          </div>
        </dl>
      </div>

      <footer className="mt-8 px-4">
        <AccountActions />
      </footer>
    </main>
  );
}
