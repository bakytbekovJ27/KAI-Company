import { useState } from "react";
import { AdminHeader } from "../components/layout/AdminHeader";
import { AdminSidebar } from "../components/layout/AdminSidebar";
import { DashboardKPI } from "../components/features/DashboardKPI";
import { ProjectsTable } from "../components/features/ProjectsTable";
import { AnalyticsCharts } from "../components/features/AnalyticsCharts";
import { ClientsSection } from "../components/features/ClientsSection";
import { ContractorsSection } from "../components/features/ContractorsSection";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Users, HardHat, FileText, Settings, Construction } from "lucide-react";

interface AdminPanelProps {
  isDark: boolean;
  onThemeToggle: () => void;
  onNavigateTo: (path: string) => void;
}

export function AdminPanel({ isDark, onThemeToggle, onNavigateTo }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Общий обзор проектов и статистики</p>
            </div>
            
            <DashboardKPI />
            <ProjectsTable />
            <AnalyticsCharts />
          </div>
        );

      case "projects":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Проекты</h1>
              <p className="text-muted-foreground">Управление всеми строительными проектами</p>
            </div>
            
            <ProjectsTable />
          </div>
        );

      case "clients":
        return <ClientsSection />;

      case "contractors":
        return <ContractorsSection />;

      case "reports":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Отчеты</h1>
              <p className="text-muted-foreground">Аналитика и отчетность по проектам</p>
            </div>
            
            <AnalyticsCharts />
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Настройки</h1>
              <p className="text-muted-foreground">Конфигурация системы и пользовательские настройки</p>
            </div>
            
            <Card>
              <CardContent className="py-12 text-center">
                <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Раздел в разработке</h3>
                <p className="text-muted-foreground">Настройки системы будут добавлены в ближайшее время</p>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader
          isDark={isDark}
          onThemeToggle={onThemeToggle}
          onNavigateTo={onNavigateTo}
        />
        
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
}