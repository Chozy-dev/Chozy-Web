/* AI 점수 → 등급 매핑과 톤 팔레트 */

export type Tone = "success" | "warning" | "danger";

export interface Tier {
  label: string;
  tone: Tone;
}

export function getTier(score: number): Tier {
  if (score >= 75) return { label: "추천", tone: "success" };
  if (score >= 50) return { label: "진입 가능", tone: "warning" };
  return { label: "비추천", tone: "danger" };
}

export function getSubTier(score: number): Tier {
  if (score >= 75) return { label: "좋음", tone: "success" };
  if (score >= 50) return { label: "보통", tone: "warning" };
  return { label: "주의", tone: "danger" };
}

export const TONE: Record<Tone, { text: string; bg: string; fill: string }> = {
  success: { text: "text-emerald-700", bg: "bg-emerald-50", fill: "bg-emerald-600" },
  warning: { text: "text-amber-700", bg: "bg-amber-50", fill: "bg-amber-500" },
  danger: { text: "text-rose-700", bg: "bg-rose-50", fill: "bg-rose-500" },
};
