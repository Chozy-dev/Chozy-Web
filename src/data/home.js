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

/* 순위 변동: up(▲n단계) / down(▼n단계) / new(신규) / flat(-) */
export function buildKeywordData(count) {
  return Array.from({ length: count }, (_, i) => {
    const rank = i + 1;
    const cycle = Math.floor(i / KEYWORD_POOL.length) + 1;
    const name = KEYWORD_POOL[i % KEYWORD_POOL.length] + (cycle > 1 ? ` ${cycle}차` : "");
    const mod = rank % 4;
    const change = mod === 1 ? "up" : mod === 2 ? "down" : mod === 0 ? "new" : "flat";
    const steps = change === "up" ? ((rank * 3) % 4) + 1 : change === "down" ? (rank % 3) + 1 : 0;
    return { rank, name, change, steps };
  });
}

const PRODUCT_POOL = [
  { name: "고퀄리티 저소음 BLDC 핸디형 휴대용 선풍기", brand: "디아코트레이닝", base: 6850 },
  { name: "18컬러 3단 자동우산 UV 자외선 차단", brand: "우산공방", base: 2900 },
  { name: "KC인증 1백(2매입) 붙이는 아이스 패치", brand: "쿨링랩", base: 170 },
  { name: "2500매송 남성 실리스 반팔 렐린 티셔츠", brand: "베이직웨어", base: 1870 },
  { name: "보냉가방 손잡이보온 보냉백", brand: "피크닉하우스", base: 5500 },
  { name: "밴프 슬립로퍼 목 어깨 안마기", brand: "릴렉스온", base: 4600 },
  { name: "차량용 공기청정기 미니", brand: "카클린", base: 12900 },
  { name: "캠핑 접이식 테이블", brand: "캠프메이트", base: 22000 },
];

export function buildProductData(count) {
  return Array.from({ length: count }, (_, i) => {
    const rank = i + 1;
    const item = PRODUCT_POOL[i % PRODUCT_POOL.length];
    return {
      rank,
      name: item.name,
      brand: item.brand,
      price: `${(item.base + rank * 37).toLocaleString()}원`,
      aiScore: 40 + ((rank * 17) % 55),
    };
  });
}

/* 투자 리포트 만들기 스테퍼 */
export const REPORT_STEPS = [
  { num: 1, label: "후보등록", caption: "상품명 올리기" },
  { num: 2, label: "1차 스크리닝", caption: "수요·경쟁도 비교" },
  { num: 3, label: "관심상품", caption: "주력 후보 모으기" },
  { num: 4, label: "비용투자 적합도", caption: "광고비 투자 판단" },
];

/* 마진 계산기 판매 채널 (수수료) */
export const CHANNELS = [
  { key: "smartstore", label: "스마트스토어", fee: 0.058 },
  { key: "coupang", label: "쿠팡", fee: 0.108 },
  { key: "ably", label: "에이블리", fee: 0.15 },
];

export const NOTIFICATIONS = [
  { type: "AI 점수 변화", tone: "success", message: "캠핑 미니 랜턴 충전식의 AI 점수가 67 → 74로 올랐어요", time: "10분 전", read: false },
  { type: "공급가 변동", tone: "danger", message: "스카프 포인트 스카프 공급가가 120원 내렸어요", time: "1시간 전", read: false },
  { type: "재입고", tone: "success", message: "프리미엄 도넛방석이 품절 3일 만에 재입고됐어요", time: "3시간 전", read: false },
  { type: "검색량 급상승", tone: "warning", message: "'차박 조명' 검색량이 전주 대비 62% 늘었어요", time: "어제", read: true },
  { type: "시스템", tone: "warning", message: "이번 달 무료 리포트를 모두 사용했어요", time: "2일 전", read: true },
  { type: "공지", tone: "warning", message: "8월 15일 새벽 서버 점검이 있었어요", time: "3일 전", read: true },
];
