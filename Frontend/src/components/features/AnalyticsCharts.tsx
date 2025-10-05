import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Download, Calendar } from "lucide-react";

const revenueData = [
  { month: "Янв", revenue: 15000000, target: 12000000 },
  { month: "Фев", revenue: 18000000, target: 15000000 },
  { month: "Мар", revenue: 22000000, target: 20000000 },
  { month: "Апр", revenue: 19000000, target: 18000000 },
  { month: "Май", revenue: 25000000, target: 22000000 },
  { month: "Июн", revenue: 28000000, target: 25000000 },
  { month: "Июл", revenue: 32000000, target: 30000000 },
  { month: "Авг", revenue: 29000000, target: 28000000 },
  { month: "Сен", revenue: 35000000, target: 32000000 },
  { month: "Окт", revenue: 38000000, target: 35000000 }
];

const projectStatusData = [
  { status: "Завершено", count: 89, fill: "#10B981" },
  { status: "В работе", count: 32, fill: "#F59E0B" },
  { status: "Планирование", count: 15, fill: "#6B7280" },
  { status: "Просрочено", count: 6, fill: "#EF4444" }
];

const budgetDistributionData = [
  { category: "Материалы", amount: 45, fill: "#1D4ED8" },
  { category: "Работы", amount: 35, fill: "#FBBF24" },
  { category: "Техника", amount: 12, fill: "#10B981" },
  { category: "Прочие", amount: 8, fill: "#F59E0B" }
];

export function AnalyticsCharts() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: 'compact'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-lg font-semibold">Финансовая аналитика</h3>
        <div className="flex items-center gap-3">
          <Select defaultValue="2024">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024 год</SelectItem>
              <SelectItem value="2023">2023 год</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Экспорт
          </Button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Выручка по месяцам
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                  tickFormatter={formatCurrency}
                />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Выручка']}
                  labelStyle={{ color: '#374151' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#1D4ED8" 
                  strokeWidth={3}
                  name="Фактическая выручка"
                  dot={{ fill: '#1D4ED8', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#FBBF24" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Плановая выручка"
                  dot={{ fill: '#FBBF24', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Project Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Проекты по статусам</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectStatusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="status" 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <Tooltip 
                  formatter={(value: number) => [value, 'Количество проектов']}
                  labelStyle={{ color: '#374151' }}
                />
                <Bar 
                  dataKey="count" 
                  radius={[4, 4, 0, 0]}
                  name="Проекты"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Budget Distribution Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Распределение бюджета по категориям</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={budgetDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="amount"
                  >
                    {budgetDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}%`, 'Доля']} />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="space-y-4">
                {budgetDistributionData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: item.fill }}
                      />
                      <span>{item.category}</span>
                    </div>
                    <span className="font-semibold">{item.amount}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}