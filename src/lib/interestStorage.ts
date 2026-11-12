type InterestStorageKey = "product-status" | "alert-thresholds";

export function readInterestPreference(key: InterestStorageKey): Record<string, unknown> {
  try {
    const stored = localStorage.getItem(`chozy:interest:${key}`);
    const value: unknown = stored === null ? null : JSON.parse(stored);
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value as Record<string, unknown>;
    }
  } catch {
    // 저장소가 차단되어 있거나 저장 값이 손상되면 화면 기본값을 사용합니다.
  }
  return {};
}

export function writeInterestPreference(key: InterestStorageKey, value: Record<string, unknown>) {
  try {
    localStorage.setItem(`chozy:interest:${key}`, JSON.stringify(value));
  } catch {
    // 저장소를 사용할 수 없어도 열린 화면의 상태는 유지됩니다.
  }
}
