export default function Card({ children, className = "" }) {
  return <div className={`bg-white border rounded-xl ${className}`}>{children}</div>;
}
