import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { 
  BarChart3, 
  Building2, 
  Users, 
  HardHat, 
  FileText, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";
import { cn } from "../ui/utils";

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: BarChart3,
    notifications: 0
  },
  {
    id: 'projects',
    label: 'Проекты',
    icon: Building2,
    notifications: 6
  },
  {
    id: 'clients',
    label: 'Клиенты',
    icon: Users,
    notifications: 0
  },
  {
    id: 'contractors',
    label: 'Подрядчики',
    icon: HardHat,
    notifications: 2
  },
  {
    id: 'reports',
    label: 'Отчеты',
    icon: FileText,
    notifications: 0
  },
  {
    id: 'settings',
    label: 'Настройки',
    icon: Settings,
    notifications: 0
  }
];

export function AdminSidebar({ activeTab, onTabChange, isCollapsed, onToggleCollapse }: AdminSidebarProps) {
  return (
    <div className={cn(
      "bg-sidebar border-r border-sidebar-border transition-all duration-300",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-sidebar-primary">Admin Panel</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="h-8 w-8"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start h-11",
                isActive && "bg-sidebar-primary text-sidebar-primary-foreground",
                isCollapsed && "px-3"
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.notifications > 0 && (
                    <Badge 
                      variant="secondary" 
                      className="ml-auto bg-accent text-accent-foreground h-5 text-xs"
                    >
                      {item.notifications}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          );
        })}
      </nav>
    </div>
  );
}