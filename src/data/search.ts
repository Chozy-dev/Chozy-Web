export interface RecentScreening {
  id: string;
  keyword: string;
  searchVolume: number;
  competition: number;
  score: number;
  tone: "red" | "yellow" | "blue";
}

// API 연결 전 디자인 확인용 예시. 배지 색상은 PNG에 표시된 값을 보존합니다.
export const RECENT_SCREENINGS: RecentScreening[] = [
  { id: "portable-fan", keyword: "휴대용 선풍기", searchVolume: 24337, competition: 0.63, score: 80, tone: "red" },
  { id: "car-diffuser", keyword: "차량용 방향제", searchVolume: 9800, competition: 0.63, score: 60, tone: "yellow" },
  { id: "wireless-earphones", keyword: "무선 이어폰", searchVolume: 31200, competition: 0.63, score: 80, tone: "blue" },
  { id: "camping-mini-lantern", keyword: "캠핑 미니 랜턴", searchVolume: 15600, competition: 0.63, score: 80, tone: "red" },
];
