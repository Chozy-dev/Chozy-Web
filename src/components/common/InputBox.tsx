import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import eyeClosedIcon from "../../assets/auth/eye-closed.svg";
import eyeOpenedIcon from "../../assets/auth/eye-opened.svg";
import deleteIcon from "../../assets/auth/delete.svg";

/* 라벨 + 밑줄 입력 — 로그인·회원가입 공용
   포커스 시 밑줄만 프라이머리로 바뀌고(라벨 색은 유지) 플레이스홀더는 감춰지며,
   값이 있으면 지우기 버튼(비밀번호는 표시 토글까지) 노출.
   action으로 우측 고정 버튼('인증번호 받기' 등)을 붙일 수 있음 */

type NativeProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "value" | "onChange" | "type">;

interface InputBoxProps extends NativeProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "password";
  className?: string;
  /** 지우기 버튼 오른쪽에 항상 노출되는 액션 (예: 인증번호 받기) */
  action?: ReactNode;
  /** 밑줄 아래 보조 문구 (예: 남은 시간). 있으면 높이가 64px보다 커짐 */
  helper?: ReactNode;
  /** false면 값이 있어도 지우기 버튼을 숨김 (예: 인증 완료된 번호) */
  clearable?: boolean;
}

export default function InputBox({
  label,
  value,
  onChange,
  type = "text",
  className = "",
  action,
  helper,
  clearable = true,
  placeholder,
  onFocus,
  onBlur,
  readOnly,
  ...props
}: InputBoxProps) {
  const [focused, setFocused] = useState(false);
  const [revealed, setRevealed] = useState(false);

  /* 읽기 전용(인증 완료 등)이면 지우기·토글을 감춤 — Figma 인증완료 상태 */
  const hasValue = value.length > 0 && !readOnly;
  const isPassword = type === "password";

  return (
    <div className={`${helper ? "min-h-16" : "h-16"} flex flex-col justify-start items-start ${className}`}>
      <label className="text-sm font-medium text-neutral-500">{label}</label>
      <div
        className={`self-stretch h-11 px-1 py-3 border-b flex justify-start items-center gap-3 ${
          focused ? "border-primary-dark" : "border-zinc-400"
        }`}
      >
        <input
          type={isPassword && !revealed ? "password" : "text"}
          readOnly={readOnly}
          value={value}
          /* 포커스되면 플레이스홀더를 감추고 커서만 보이게 */
          placeholder={focused ? "" : placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 min-w-0 bg-transparent outline-none text-base font-medium text-zinc-900 placeholder:text-zinc-400 placeholder:font-medium"
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />

        {hasValue && isPassword && (
          <button
            type="button"
            /* 포커스가 풀리면서 버튼이 사라지지 않도록 blur 전에 처리 */
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setRevealed((v) => !v)}
            aria-label={revealed ? "비밀번호 숨기기" : "비밀번호 표시"}
            className="flex-shrink-0"
          >
            <img src={revealed ? eyeOpenedIcon : eyeClosedIcon} alt="" className="w-6 h-6" />
          </button>
        )}

        {hasValue && clearable && (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onChange("")}
            aria-label={`${label} 지우기`}
            className="flex-shrink-0"
          >
            <img src={deleteIcon} alt="" className="w-6 h-6" />
          </button>
        )}

        {/* 지우기와는 8px 간격(Figma) — 부모 gap-3보다 좁아 -ml로 보정 */}
        {action && <div className={hasValue && clearable ? "-ml-1" : ""}>{action}</div>}
      </div>
      {helper && <div className="mt-1">{helper}</div>}
    </div>
  );
}
