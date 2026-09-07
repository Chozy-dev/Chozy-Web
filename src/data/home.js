/* 홈 화면 목데이터 — 백엔드 연동 시 API 응답으로 대체 */

export const CATEGORY_TREE = {
  전체: [],
  패션의류: ["전체", "여성의류", "남성의류", "언더웨어", "아동복"],
  패션잡화: ["전체", "가방", "신발", "주얼리", "시계"],
  "화장품/미용": ["전체", "스킨케어", "메이크업", "헤어케어", "바디케어"],
  "디지털/가전": ["전체", "생활가전", "주방가전", "계절가전", "스마트기기"],
  "가구/인테리어": ["전체", "가구", "침구", "수납정리", "홈데코"],
  "출산/육아": ["전체", "기저귀·분유", "유아동의류", "완구", "유모차·카시트"],
  식품: ["전체", "농산물", "가공식품", "건강식품", "음료"],
  "스포츠/레저": ["전체", "캠핑용품", "홈트레이닝", "골프", "자전거"],
  "생활/건강": ["전체", "생활용품", "건강용품", "반려동물", "차량용품"],
};

export const DEFAULT_RANK_COUNT = 9;
export const MAX_RANK_COUNT = 50;

const KEYWORD_POOL = [
  "휴대용 선풍기", "차량용 미니청소기", "캠핑 랜턴", "머슬핏 반팔티", "양털 파우치",
  "무선 미니 가습기", "접이식 독서대", "스텐 밀폐용기", "차량용 공기청정기", "메모리폼 방석",
  "보조배터리 케이블", "캠핑 테이블", "차박 매트", "휴대용 선크림", "무선 이어폰 케이스",
  "캠핑 의자", "여행용 파우치", "차량용 방향제", "등산 스틱", "캠핑 랜턴 거치대",
];

export function buildKeywordData(count) {
  return Array.from({ length: count }, (_, i) => {
    const rank = i + 1;
    const cycle = Math.floor(i / KEYWORD_POOL.length) + 1;
    const name = KEYWORD_POOL[i % KEYWORD_POOL.length] + (cycle > 1 ? ` ${cycle}차` : "");
    const mod = rank % 4;
    const change = mod === 1 ? "up" : mod === 2 ? "down" : mod === 0 ? "new" : "flat";
    const pct =
      change === "up" ? `+${((rank * 13) % 160) + 15}%`
      : change === "down" ? `▼${(rank % 5) + 1}단계`
      : change === "new" ? "신규"
      : "-";
    return { rank, name, change, pct };
  });
}

const PRODUCT_POOL = [
  { name: "고퀄리티 저소음 BLDC 핸디형 휴대용...", base: 6850 },
  { name: "18컬러 3단 자동우산 UV 자외선...", base: 2900 },
  { name: "KC인증 1백(2매입) 붙이는 아이스 패치", base: 170 },
  { name: "2500매송 남성 실리스 반팔 렐린...", base: 1870 },
  { name: "보냉가방 손잡이보온 보냉백", base: 5500 },
  { name: "밴프 슬립로퍼 목 어깨 안마기", base: 4600 },
  { name: "차량용 공기청정기 미니", base: 12900 },
  { name: "캠핑 접이식 테이블", base: 22000 },
];

export function buildProductData(count) {
  return Array.from({ length: count }, (_, i) => {
    const rank = i + 1;
    const item = PRODUCT_POOL[i % PRODUCT_POOL.length];
    return {
      rank,
      name: item.name,
      price: `${(item.base + rank * 37).toLocaleString()}원`,
      aiScore: 40 + ((rank * 17) % 55),
    };
  });
}

export const AI_PICKS = [
  { name: "차박 감성 조명", price: "9,900원", score: 91, note: "검색량 3주 연속 상승" },
  { name: "휴대용 미니 선풍기", price: "12,800원", score: 86, note: "마진율 카테고리 평균 상회" },
  { name: "접이식 캠핑 테이블", price: "22,000원", score: 74, note: "경쟁 상품 증가 추세" },
];

export const SEASON_THEMES = ["물놀이 용품 기획전", "장마 대비 기획전", "DIY 아이템 기획전"];

export const WISHLIST_CHANGES = [
  { name: "캠핑 미니 랜턴 충전식", price: "4,500원", primary: "AI 점수 ▲7", primaryTone: "success", sub: "공급가 변동 없음" },
  { name: "스카프 포인트 스카프", price: "12,500원", primary: "AI 점수 ▼3", primaryTone: "danger", sub: "공급가 -120원" },
  { name: "프리미엄 도넛방석", price: "23,000원", primary: "재입고", primaryTone: "success", sub: "품절 3일 만에 해제" },
];

export const NEW_PRODUCTS = [
  { name: "플리츠바지 여자여름바지 플리츠주름바지 여자안...", price: "4,500원" },
  { name: "스카프 포인트스카프 사각스카프 여성스카프", price: "12,500원" },
  { name: "자전거우비 고급우의 바이크우비 골프비옷", price: "3,600원" },
];

export const NOTIFICATIONS = [
  { type: "AI 점수 변화", tone: "success", message: "캠핑 미니 랜턴 충전식의 AI 점수가 67 → 74로 올랐어요", time: "10분 전", read: false },
  { type: "공급가 변동", tone: "danger", message: "스카프 포인트 스카프 공급가가 120원 내렸어요", time: "1시간 전", read: false },
  { type: "재입고", tone: "success", message: "프리미엄 도넛방석이 품절 3일 만에 재입고됐어요", time: "3시간 전", read: false },
  { type: "검색량 급상승", tone: "warning", message: "'차박 조명' 검색량이 전주 대비 62% 늘었어요", time: "어제", read: true },
  { type: "시스템", tone: "warning", message: "이번 달 무료 리포트를 모두 사용했어요", time: "2일 전", read: true },
  { type: "공지", tone: "warning", message: "8월 15일 새벽 서버 점검이 있었어요", time: "3일 전", read: true },
];

export const CHANGE_FILTER_OPTIONS = [
  "공급가 상승", "공급가 하락", "품절 임박", "품절",
  "재입고", "출고일 변경", "검색량 급상승", "AI 점수 상승", "AI 점수 하락",
];
