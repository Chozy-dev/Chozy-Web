import { useState } from "react";

export default function usePreference<T extends string>(
  key: string,
  options: readonly T[],
  defaultValue: T,
) {
  const storageKey = `chozy.mypage.${key}`;
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return options.find((option) => option === saved) ?? defaultValue;
    } catch {
      return defaultValue;
    }
  });

  function updateValue(nextValue: T) {
    setValue(nextValue);
    try {
      localStorage.setItem(storageKey, nextValue);
    } catch {
      // 저장소를 사용할 수 없어도 현재 화면에는 선택을 반영합니다.
    }
  }

  return [value, updateValue] as const;
}
