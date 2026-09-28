import { useEffect, useLayoutEffect, useRef, useState, type ChangeEvent, type InputHTMLAttributes, type ReactNode } from "react";
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
  /** 비밀번호를 가릴 때 쓸 문자 (예: "*"). 없으면 브라우저 기본 가림(●) */
  mask?: string;
}

/* 가려진 값(마스크 문자열)의 변경을 실제 값에 반영
   sel: 변경 직전 선택 범위, caret: 변경 후 커서 위치 */
const applyMaskedEdit = (prev: string, next: string, sel: { start: number; end: number }, caret: number) => {
  // 선택 영역 치환·입력: 선택 범위를 새로 들어온 문자로 교체
  if (sel.start !== sel.end || next.length >= prev.length) {
    return prev.slice(0, sel.start) + next.slice(sel.start, caret) + prev.slice(sel.end);
  }
  // 선택 없이 줄어듦: 백스페이스·Delete — 커서 위치부터 줄어든 만큼 삭제
  return prev.slice(0, caret) + prev.slice(caret + prev.length - next.length);
};

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
  mask,
  ...props
}: InputBoxProps) {
  const [focused, setFocused] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  /** 마스크 입력용 — 입력 직전 선택 범위 */
  const selectionRef = useRef({ start: 0, end: 0 });
  /** 마스크 입력용 — 값을 다시 그린 뒤 되돌릴 커서 위치 (안 하면 맨 끝으로 튐) */
  const caretRef = useRef<number | null>(null);

  /* 읽기 전용(인증 완료 등)이면 지우기·토글을 감춤 — Figma 인증완료 상태 */
  const hasValue = value.length > 0 && !readOnly;
  const isPassword = type === "password";
  /* 마스크 문자로 가릴 땐 text 입력에 마스크 문자열을 보여주고 실제 값은 따로 관리 */
  const masking = isPassword && !revealed && !!mask;

  useEffect(() => {
    const el = inputRef.current;
    if (!masking || !el) return;
    const record = () => {
      selectionRef.current = { start: el.selectionStart ?? 0, end: el.selectionEnd ?? 0 };
    };
    el.addEventListener("beforeinput", record);
    return () => el.removeEventListener("beforeinput", record);
  }, [masking]);

  useLayoutEffect(() => {
    const el = inputRef.current;
    if (caretRef.current === null || !el) return;
    const caret = Math.min(caretRef.current, value.length);
    el.setSelectionRange(caret, caret);
    caretRef.current = null;
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    if (!masking) return onChange(next);
    const caret = e.target.selectionStart ?? next.length;
    caretRef.current = caret;
    onChange(applyMaskedEdit(value, next, selectionRef.current, caret));
  };

  return (
    <div className={`${helper ? "min-h-16" : "h-16"} flex flex-col justify-start items-start ${className}`}>
      <label className="text-sm font-medium text-neutral-500">{label}</label>
      <div
        className={`self-stretch h-11 px-1 py-3 border-b flex justify-start items-center gap-3 ${
          focused ? "border-primary-dark" : "border-zinc-400"
        }`}
      >
        <input
          ref={inputRef}
          type={isPassword && !revealed && !mask ? "password" : "text"}
          readOnly={readOnly}
          value={masking ? mask.repeat(value.length) : value}
          /* 포커스되면 플레이스홀더를 감추고 커서만 보이게 */
          placeholder={focused ? "" : placeholder}
          onChange={handleChange}
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
