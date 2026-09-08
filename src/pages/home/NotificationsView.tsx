import { ArrowLeft } from "lucide-react";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import { NOTIFICATIONS } from "../../data/home";

interface NotificationsViewProps {
  onBack: () => void;
}

export default function NotificationsView({ onBack }: NotificationsViewProps) {
  return (
    <div className="px-4 pt-4 pb-24">
      <button onClick={onBack} className="flex items-center gap-1 text-stone-500 text-xs mb-3">
        <ArrowLeft size={14} /> 홈으로
      </button>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-bold text-stone-900">알림</h1>
        <button className="text-xs text-primary">모두 읽음 처리</button>
      </div>
      <Card className="overflow-hidden">
        {NOTIFICATIONS.map((n, i, arr) => (
          <div
            key={i}
            className={`flex items-start gap-2.5 px-3.5 py-3 ${i !== arr.length - 1 ? "border-b border-stone-100" : ""} ${
              !n.read ? "bg-primary-light/40" : ""
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${!n.read ? "bg-primary" : "bg-transparent"}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <Badge tone={n.tone}>{n.type}</Badge>
                <span className="text-[10px] text-stone-400">{n.time}</span>
              </div>
              <p className="text-xs text-stone-800 leading-snug">{n.message}</p>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
