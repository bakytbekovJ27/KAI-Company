import { useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { NotificationsDropdown } from "../features/NotificationsDropdown";
import { AdminManagementModal } from "../modal/AdminManagementModal";
import { Sun, Moon, LogOut, User, Settings, Users } from "lucide-react";

interface AdminHeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
  onNavigateTo: (path: string) => void;
}

export function AdminHeader({ isDark, onThemeToggle, onNavigateTo }: AdminHeaderProps) {
  const [isAdminManagementOpen, setIsAdminManagementOpen] = useState(false);

  return (
    <header className="h-16 bg-background border-b border-border px-6 flex items-center justify-between">
      {/* Left side - Logo */}
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-primary cursor-pointer" onClick={() => onNavigateTo('/')}>
          StroyControl
        </h1>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onThemeToggle}
          className="h-9 w-9"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {/* Notifications */}
        <NotificationsDropdown onNavigateTo={onNavigateTo} />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 px-2">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    АД
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium">Администратор</div>
                  <div className="text-xs text-muted-foreground">admin@stroycontrol.ru</div>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Профиль</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="ml-6">• Редактировать профиль</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsAdminManagementOpen(true)}>
              <span className="ml-6">• Управление админами</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Настройки
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onNavigateTo('/')}>
              <LogOut className="mr-2 h-4 w-4" />
              Выйти
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AdminManagementModal
        isOpen={isAdminManagementOpen}
        onClose={() => setIsAdminManagementOpen(false)}
      />
    </header>
  );
}