export const URL_REPORT_SECTIONS = [
  { title: "내부 진단", description: "수익성·공급 안정성·공급사 신뢰도 점수" },
  { title: "외부 진단", description: "검색 트렌드·경쟁강도·시즌 타이밍" },
  { title: "비용 투자 전략", description: "채널별 CPC·콘텐츠 경쟁강도·가격 경쟁력" },
  { title: "비용 투자 시뮬레이션", description: "목표 판매량 입력 시 예상 광고비·손익분기" },
] as const;

export interface RecentUrlAnalysis {
  id: string;
  url: string;
  analyzedAt: string;
}

// API 연결 전 디자인 확인용 기록입니다. 새 분석 요청으로 추가하지 않습니다.
export const RECENT_URL_ANALYSES: RecentUrlAnalysis[] = [
  { id: "example-report-1", url: "https://example.com", analyzedAt: "2026-11-13" },
  { id: "example-report-2", url: "https://example.com", analyzedAt: "2026-11-13" },
];
