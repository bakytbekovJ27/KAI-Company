import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Search, Filter, MoreHorizontal, Plus, Edit, Eye, Trash2, Calendar } from "lucide-react";
import { toast } from "sonner";

const projectsData = [
  {
    id: 1,
    name: "ЖК \"Современность\"",
    client: "ООО \"СтройИнвест\"",
    status: "completed",
    deadline: "2024-03-15",
    budget: 45000000,
    progress: 100,
    area: 1500
  },
  {
    id: 2,
    name: "Бизнес-центр \"Столица\"",
    client: "ПАО \"МегаСтрой\"", 
    status: "in-progress",
    deadline: "2024-12-30",
    budget: 125000000,
    progress: 65,
    area: 3200
  },
  {
    id: 3,
    name: "Торговый центр \"Галерея\"",
    client: "ИП Иванов А.С.",
    status: "planning",
    deadline: "2025-06-15",
    budget: 85000000,
    progress: 15,
    area: 2800
  },
  {
    id: 4,
    name: "Складской комплекс",
    client: "ООО \"ЛогистикПро\"",
    status: "overdue",
    deadline: "2024-01-20",
    budget: 32000000,
    progress: 85,
    area: 5000
  },
  {
    id: 5,
    name: "Жилой дом на Лесной",
    client: "Семья Петровых",
    status: "in-progress",
    deadline: "2024-08-10",
    budget: 15000000,
    progress: 45,
    area: 450
  }
];

const statusConfig = {
  completed: { label: "Завершён", variant: "default" as const, color: "bg-success text-success-foreground" },
  "in-progress": { label: "В работе", variant: "secondary" as const, color: "bg-warning text-warning-foreground" },
  planning: { label: "Планирование", variant: "outline" as const, color: "bg-muted text-muted-foreground" },
  overdue: { label: "Просрочен", variant: "destructive" as const, color: "bg-destructive text-destructive-foreground" }
};

export function ProjectsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    client: "",
    type: "",
    area: "",
    budget: "",
    startDate: "",
    endDate: "",
    description: ""
  });

  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const handleAddProject = () => {
    if (!newProject.name || !newProject.client || !newProject.type) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }

    // In a real app, this would make an API call
    toast.success("Проект успешно создан!");
    setIsAddModalOpen(false);
    setNewProject({
      name: "",
      client: "",
      type: "",
      area: "",
      budget: "",
      startDate: "",
      endDate: "",
      description: ""
    });
  };

  const getUrgencyIndicator = (deadline: string, status: string) => {
    if (status === "completed") return null;
    
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDeadline < 0) {
      return <Badge variant="destructive" className="ml-2 text-xs">Просрочен</Badge>;
    } else if (daysUntilDeadline <= 7) {
      return <Badge variant="secondary" className="ml-2 text-xs bg-warning text-warning-foreground">Срочно</Badge>;
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>Управление проектами</CardTitle>
          
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Добавить проект
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Создать новый проект</DialogTitle>
              </DialogHeader>
              
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Название проекта *</Label>
                    <Input
                      id="name"
                      value={newProject.name}
                      onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Введите название проекта"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client">Клиент *</Label>
                    <Select value={newProject.client} onValueChange={(value) => setNewProject(prev => ({ ...prev, client: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите клиента" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="client1">ООО \"СтройИнвест\"</SelectItem>
                        <SelectItem value="client2">ПАО \"МегаСтрой\"</SelectItem>
                        <SelectItem value="client3">ИП Иванов А.С.</SelectItem>
                        <SelectItem value="client4">ООО \"ЛогистикПро\"</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Тип работ *</Label>
                    <Select value={newProject.type} onValueChange={(value) => setNewProject(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Жилое строительство</SelectItem>
                        <SelectItem value="commercial">Коммерческое строительство</SelectItem>
                        <SelectItem value="industrial">Промышленное строительство</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Площадь (м²)</Label>
                    <Input
                      id="area"
                      value={newProject.area}
                      onChange={(e) => setNewProject(prev => ({ ...prev, area: e.target.value }))}
                      placeholder="Введите площадь"
                      type="number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Бюджет</Label>
                  <Input
                    id="budget"
                    value={newProject.budget}
                    onChange={(e) => setNewProject(prev => ({ ...prev, budget: e.target.value }))}
                    placeholder="Введите бюджет"
                    type="number"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Дата начала</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newProject.startDate}
                      onChange={(e) => setNewProject(prev => ({ ...prev, startDate: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Дата окончания</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newProject.endDate}
                      onChange={(e) => setNewProject(prev => ({ ...prev, endDate: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    value={newProject.description}
                    onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Описание проекта..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={handleAddProject}>
                  Создать проект
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по названию или клиенту..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Фильтр по статусу" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="completed">Завершённые</SelectItem>
              <SelectItem value="in-progress">В работе</SelectItem>
              <SelectItem value="planning">Планирование</SelectItem>
              <SelectItem value="overdue">Просроченные</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название проекта</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дедлайн</TableHead>
                <TableHead>Бюджет</TableHead>
                <TableHead>Прогресс</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{project.client}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={statusConfig[project.status as keyof typeof statusConfig].variant}
                      className={statusConfig[project.status as keyof typeof statusConfig].color}
                    >
                      {statusConfig[project.status as keyof typeof statusConfig].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                      {formatDate(project.deadline)}
                      {getUrgencyIndicator(project.deadline, project.status)}
                    </div>
                  </TableCell>
                  <TableCell>{formatCurrency(project.budget)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={project.progress} className="w-16" />
                      <span className="text-sm text-muted-foreground">{project.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Просмотреть
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Редактировать
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Удалить
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Проекты не найдены
          </div>
        )}
      </CardContent>
    </Card>
  );
}