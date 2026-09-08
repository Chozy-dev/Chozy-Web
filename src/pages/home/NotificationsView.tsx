import { useState } from "react";
import { ChevronLeft, TrendingUp, RefreshCw, PackageCheck, Search, Bell, type LucideIcon } from "lucide-react";
import { NOTIFICATIONS, type AppNotification, type NotificationType } from "../../data/home";

/* 알림 — 읽지 않은 알림 / '이전 알림' 구분, 전체 읽음 시 구분 없이 한 목록, 비어 있으면 안내 문구
   아이콘은 Figma 에셋 전달 전까지 lucide로 근사 (타입별 맵이라 교체 지점이 한 곳) */

const ICONS: Record<NotificationType, { Icon: LucideIcon; className: string }> = {
  score: { Icon: TrendingUp, className: "text-rise" },
  supply: { Icon: RefreshCw, className: "text-amber-400" },
  restock: { Icon: PackageCheck, className: "text-emerald-500" },
  search: { Icon: Search, className: "text-fall" },
  system: { Icon: Bell, className: "text-gray1" },
};

function NotificationItem({ notification }: { notification: AppNotification }) {
  const { Icon, className } = ICONS[notification.type];
  return (
    <li className="flex gap-2 px-5 py-3">
      <Icon size={18} strokeWidth={2} className={`mt-0.5 flex-shrink-0 ${className}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[13px] text-gray1">{notification.label}</span>
          {!notification.read && <span className="w-1.5 h-1.5 rounded-full bg-rise flex-shrink-0" />}
          <span className="ml-auto text-xs text-gray1 flex-shrink-0">{notification.time}</span>
        </div>
        <p className="mt-1 text-sm text-black1 leading-snug">{notification.message}</p>
      </div>
    </li>
  );
}

interface NotificationsViewProps {
  onBack: () => void;
}

export default function NotificationsView({ onBack }: NotificationsViewProps) {
  const [notifications, setNotifications] = useState<AppNotification[]>(NOTIFICATIONS);

  const unread = notifications.filter((n) => !n.read);
  const read = notifications.filter((n) => n.read);
  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <div className="min-h-full flex flex-col bg-white">
      <header className="px-5 pt-4">
        <div className="flex items-center justify-between">
          <button onClick={onBack} aria-label="뒤로">
            <ChevronLeft size={24} className="text-black1" />
          </button>
          <button
            onClick={markAllRead}
            disabled={unread.length === 0}
            className="text-sm text-gray1 disabled:text-gray3"
          >
            모두 읽음 처리
          </button>
        </div>
        <h1 className="mt-3 mb-2 text-xl font-bold text-black1">알림</h1>
      </header>

      {notifications.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm font-medium text-black1">새로운 알림이 없어요</p>
        </div>
      ) : (
        <ul className="pb-8">
          {unread.map((n) => (
            <NotificationItem key={n.id} notification={n} />
          ))}

          {/* 읽지 않은 알림이 있을 때만 이전 알림과 구분 */}
          {unread.length > 0 && read.length > 0 && (
            <li className="flex items-center gap-3 px-5 py-4" aria-hidden>
              <span className="flex-1 h-px bg-line" />
              <span className="text-xs text-gray1">이전 알림</span>
              <span className="flex-1 h-px bg-line" />
            </li>
          )}

          {read.map((n) => (
            <NotificationItem key={n.id} notification={n} />
          ))}
        </ul>
      )}
    </div>
  );
}
