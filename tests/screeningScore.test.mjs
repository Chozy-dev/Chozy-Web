import assert from "node:assert/strict";
import test from "node:test";
import { calculateScreeningScore } from "../src/lib/screeningScore.ts";
import { selectScreeningResults } from "../src/lib/screeningResults.ts";

const sample = { searchVolume: 15300, clickRate: 2.1, competition: "high", searchChange: -15.3, shoppingChange: null };

test("v24 산식: 쇼핑 미선택 시 90점 만점을 100점으로 환산", () => {
  const result = calculateScreeningScore(sample);
  // 수요 16.6875 + 성장 10.5875 + 경쟁 5 = 32.275, /90*100 = 35.8611...
  assert.equal(result.score, 36);
  assert.equal(result.availableWeight, 90);
  assert.deepEqual(result.omittedFactors, ["shopping"]);
  assert.ok(Math.abs(result.contributions.growth - 10.5875) < 1e-10);
});

test("분야 선택 시 쇼핑 기여도와 배점 10을 포함하고, 해제 시 원래 점수로 복귀", () => {
  const selected = calculateScreeningScore({ ...sample, shoppingChange: 12.5 });
  // 쇼핑 5.625를 합산하면 37.9점, 정수 표시 38점.
  assert.equal(selected.score, 38);
  assert.equal(selected.availableWeight, 100);
  assert.equal(selected.contributions.shopping, 5.625);
  assert.deepEqual(selected.omittedFactors, []);
  assert.equal(calculateScreeningScore({ ...sample, shoppingChange: null }).score, 36);
});

test("경쟁 유리도 낮음 80·중간 50·높음 20을 25점 배점으로 변환", () => {
  for (const [competition, contribution] of [["low", 20], ["medium", 12.5], ["high", 5]]) {
    assert.equal(calculateScreeningScore({ competition }).contributions.competition, contribution);
  }
});

test("데이터랩 생략 시 성장·쇼핑 배점을 함께 제외", () => {
  const result = calculateScreeningScore({ ...sample, searchChange: null });
  // 16.6875 + 5 = 21.6875, /65*100 = 33.3653...
  assert.equal(result.score, 33);
  assert.equal(result.availableWeight, 65);
  assert.deepEqual(result.omittedFactors, ["growth", "shopping"]);
});

test("검색량 3만·클릭률 8% 상한과 성장·쇼핑 기여도 상하한 적용", () => {
  const result = calculateScreeningScore({ searchVolume: 60000, clickRate: 15, competition: "low", searchChange: 300, shoppingChange: 300 });
  assert.deepEqual(result.contributions, { searchVolume: 25, clickRate: 15, growth: 25, competition: 20, shopping: 10 });
  assert.equal(result.score, 95);
  const minimum = calculateScreeningScore({ searchVolume: 0, clickRate: 0, searchChange: -300, shoppingChange: -300 });
  assert.equal(minimum.score, 0);
  assert.equal(minimum.contributions.growth, 0);
  assert.equal(minimum.contributions.shopping, 0);
});

test("없는 데이터는 제외하고, 유효한 0은 계산에 포함", () => {
  const partial = calculateScreeningScore({ searchVolume: 0, clickRate: null, searchChange: undefined, shoppingChange: NaN });
  assert.equal(partial.score, 0);
  assert.equal(partial.availableWeight, 25);
  const missing = calculateScreeningScore({ searchVolume: Infinity, clickRate: null });
  assert.equal(missing.score, null);
  assert.equal(missing.availableWeight, 0);
  assert.equal(missing.omittedFactors.length, 5);
});

test("점수순에서 계산 대기는 마지막, 동점은 입력 순서 유지", () => {
  const results = [
    { id: "waiting", uploadOrder: 0, score: null, searchVolume: 100, competition: "high" },
    { id: "first", uploadOrder: 1, score: 36, searchVolume: 100, competition: "high" },
    { id: "second", uploadOrder: 2, score: 52, searchVolume: 100, competition: "medium" },
    { id: "third", uploadOrder: 3, score: 36, searchVolume: 100, competition: "high" },
  ];
  const original = structuredClone(results);
  assert.deepEqual(selectScreeningResults(results, "score", 0, "all").map((result) => result.id), ["second", "first", "third", "waiting"]);
  assert.deepEqual(results, original);
});
