/* 디자인 확정 전 임시 화면 */
export default function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-sm text-gray-400">{label} 화면 준비 중</p>
    </div>
  );
}
