export default function Card({ children, className = "" }) {
  return <div className={`bg-white border border-stone-200 rounded-xl ${className}`}>{children}</div>;
}
