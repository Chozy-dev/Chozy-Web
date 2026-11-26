// 구간별 기울기를 제한해 0~100 범위를 넘지 않는 보간 곡선을 만듭니다.
export function createTrendPath(values: number[], width = 326, height = 56, top = 4): string {
  if (values.length < 2) return "";
  const step = width / (values.length - 1);
  const points = values.map((value, index) => ({ x: index * step, y: top + height * (1 - Math.min(100, Math.max(0, value)) / 100) }));
  const slopes = points.slice(1).map((point, index) => (point.y - points[index].y) / step);
  const tangents = points.map((_, index) => {
    if (index === 0) return slopes[0];
    if (index === points.length - 1) return slopes[slopes.length - 1];
    const before = slopes[index - 1];
    const after = slopes[index];
    return before * after <= 0 ? 0 : 2 / (1 / before + 1 / after);
  });
  const number = (value: number) => Number(value.toFixed(2));
  let path = `M ${number(points[0].x)} ${number(points[0].y)}`;
  for (let index = 1; index < points.length; index++) {
    const previous = points[index - 1];
    const point = points[index];
    path += ` C ${number(previous.x + step / 3)} ${number(previous.y + tangents[index - 1] * step / 3)} ${number(point.x - step / 3)} ${number(point.y - tangents[index] * step / 3)} ${number(point.x)} ${number(point.y)}`;
  }
  return path;
}
