/* 입력칸 아래 빨간 조건 안내 문구 — 한 줄씩 나눠 표시 */

export default function ErrorText({ lines }: { lines: string[] }) {
  return (
    <div className="text-sm font-medium text-red-500">
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}
