import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { TrendingUp, TrendingDown, Building2, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const kpiData = [
  {
    title: "Всего проектов",
    value: 127,
    change: "+12%",
    trend: "up",
    icon: Building2,
    color: "text-primary"
  },
  {
    title: "Завершено",
    value: 89,
    change: "+8%", 
    trend: "up",
    icon: CheckCircle,
    color: "text-success"
  },
  {
    title: "В работе",
    value: 32,
    change: "-5%",
    trend: "down", 
    icon: Clock,
    color: "text-warning"
  },
  {
    title: "Просрочено",
    value: 6,
    change: "+2",
    trend: "up",
    icon: AlertTriangle,
    color: "text-destructive"
  }
];

export function DashboardKPI() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpiData.map((item, index) => {
        const Icon = item.icon;
        const TrendIcon = item.trend === "up" ? TrendingUp : TrendingDown;
        
        return (
          <Card key={index} className="transition-all duration-200 hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg bg-current/10 flex items-center justify-center ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <Badge 
                  variant={item.trend === "up" ? "default" : "secondary"}
                  className={`
                    ${item.trend === "up" 
                      ? "bg-success/10 text-success hover:bg-success/20" 
                      : "bg-destructive/10 text-destructive hover:bg-destructive/20"
                    }
                  `}
                >
                  <TrendIcon className="w-3 h-3 mr-1" />
                  {item.change}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div className="text-3xl font-bold">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.title}</div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}