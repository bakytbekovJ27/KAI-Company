import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";
import { Bell, Settings, CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react";

interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "info",
    title: "Новый проект добавлен",
    description: "\"Ремонт квартиры на ул. Ленина\"",
    timestamp: "2 минуты назад",
    isRead: false,
    link: "/admin/projects"
  },
  {
    id: "2",
    type: "warning",
    title: "Просрочен дедлайн",
    description: "Проект \"Офисное здание\"",
    timestamp: "15 минут назад",
    isRead: false,
    link: "/admin/projects"
  },
  {
    id: "3",
    type: "success",
    title: "Документ загружен",
    description: "Клиент \"Иван Петров\"",
    timestamp: "1 час назад",
    isRead: true,
    link: "/admin/clients"
  },
  {
    id: "4",
    type: "error",
    title: "Ошибка в системе",
    description: "Проблема с синхронизацией данных",
    timestamp: "2 часа назад",
    isRead: false,
    link: "/admin/settings"
  },
  {
    id: "5",
    type: "info",
    title: "Новый подрядчик",
    description: "Сергей Молотков подал заявку",
    timestamp: "3 часа назад",
    isRead: true,
    link: "/admin/contractors"
  }
];

interface NotificationsDropdownProps {
  onNavigateTo?: (path: string) => void;
}

export function NotificationsDropdown({ onNavigateTo }: NotificationsDropdownProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <Info className="w-4 h-4 text-blue-500" />;
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getNotificationBadge = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return "🔵";
      case "success":
        return "🟢";
      case "warning":
        return "🟡";
      case "error":
        return "🔴";
      default:
        return "🔵";
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(n => 
        n.id === notification.id ? { ...n, isRead: true } : n
      )
    );

    // Navigate if link provided
    if (notification.link && onNavigateTo) {
      onNavigateTo(notification.link);
    }

    setIsOpen(false);
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  const handleShowAll = () => {
    if (onNavigateTo) {
      onNavigateTo("/admin/notifications");
    }
    setIsOpen(false);
  };

  const handleSettingsClick = () => {
    if (onNavigateTo) {
      onNavigateTo("/admin/notification-settings");
    }
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs animate-pulse-soft"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-80">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-semibold">Уведомления</h3>
          <div className="flex items-center space-x-1">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs px-2 py-1 h-auto"
              >
                Прочитать все
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSettingsClick}
              className="h-6 w-6"
            >
              <Settings className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <ScrollArea className="max-h-96">
          {notifications.length > 0 ? (
            <div className="py-2">
              {notifications.slice(0, 6).map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="p-0 cursor-pointer"
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start space-x-3 p-3 w-full hover:bg-accent">
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="text-sm font-medium line-clamp-1">
                        {notification.title}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {notification.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.timestamp}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <div className="flex-shrink-0 mt-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <Bell className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Нет новых уведомлений
              </p>
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-center p-3 cursor-pointer"
              onClick={handleShowAll}
            >
              <span className="text-sm text-primary">
                Показать все уведомления
              </span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}