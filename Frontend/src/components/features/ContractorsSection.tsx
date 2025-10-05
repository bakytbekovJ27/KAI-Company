import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { AddContractorModal } from "../modal/AddContractorModal";
import { Search, Filter, UserPlus, Phone, Mail, Star, HardHat } from "lucide-react";

interface Contractor {
  id: string;
  name: string;
  email?: string;
  phone: string;
  specialization: string;
  rate: number;
  rateType: "hour" | "day";
  rating: number;
  completedJobs: number;
  avatar?: string;
  notes?: string;
  isActive: boolean;
}

const mockContractors: Contractor[] = [
  {
    id: "1",
    name: "Сергей Молотков",
    email: "sergey@example.com",
    phone: "+7 999 111-22-33",
    specialization: "Прораб",
    rate: 3000,
    rateType: "day",
    rating: 4.8,
    completedJobs: 15,
    isActive: true,
    notes: "Опытный прораб с 10-летним стажем"
  },
  {
    id: "2",
    name: "Алексей Электриков",
    phone: "+7 916 555-44-33",
    specialization: "Электрик",
    rate: 800,
    rateType: "hour",
    rating: 4.9,
    completedJobs: 8,
    isActive: true,
    notes: "Специалист по промышленной электрике"
  },
  {
    id: "3",
    name: "Иван Сантехников",
    email: "ivan.santech@gmail.com",
    phone: "+7 903 777-88-99",
    specialization: "Сантехник",
    rate: 700,
    rateType: "hour",
    rating: 4.5,
    completedJobs: 12,
    isActive: false,
    notes: "Временно недоступен"
  }
];

const specializations = [
  "Прораб",
  "Электрик", 
  "Сантехник",
  "Маляр",
  "Плиточник",
  "Штукатур",
  "Кровельщик",
  "Каменщик",
  "Плотник",
  "Другое"
];

export function ContractorsSection() {
  const [contractors, setContractors] = useState<Contractor[]>(mockContractors);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialization, setFilterSpecialization] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredContractors = contractors.filter(contractor => {
    const matchesSearch = contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contractor.phone.includes(searchTerm) ||
                         contractor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialization = filterSpecialization === "all" || 
                                 contractor.specialization === filterSpecialization;
    
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "active" ? contractor.isActive : !contractor.isActive);
    
    return matchesSearch && matchesSpecialization && matchesStatus;
  });

  const handleAddContractor = (newContractor: Omit<Contractor, "id" | "completedJobs" | "isActive">) => {
    const contractor: Contractor = {
      ...newContractor,
      id: Date.now().toString(),
      completedJobs: 0,
      isActive: true
    };
    setContractors(prev => [...prev, contractor]);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating) 
            ? "fill-yellow-400 text-yellow-400" 
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Подрядчики</h1>
          <p className="text-muted-foreground">Управление командой подрядчиков</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Добавить подрядчика
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск по имени, телефону или специализации..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterSpecialization} onValueChange={setFilterSpecialization}>
          <SelectTrigger className="w-full sm:w-48">
            <HardHat className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Специализация" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все специализации</SelectItem>
            {specializations.map(spec => (
              <SelectItem key={spec} value={spec}>{spec}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-32">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все</SelectItem>
            <SelectItem value="active">Активные</SelectItem>
            <SelectItem value="inactive">Неактивные</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Contractors Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredContractors.map((contractor) => (
          <Card key={contractor.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={contractor.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {getInitials(contractor.name)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold truncate">{contractor.name}</h3>
                    {!contractor.isActive && (
                      <Badge variant="secondary" className="text-xs">
                        Неактивен
                      </Badge>
                    )}
                  </div>
                  
                  <Badge variant="outline" className="mb-2 text-xs">
                    {contractor.specialization}
                  </Badge>
                  
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="h-3 w-3 mr-1" />
                      <span>{contractor.phone}</span>
                    </div>
                    
                    {contractor.email && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="h-3 w-3 mr-1" />
                        <span className="truncate">{contractor.email}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {renderStars(contractor.rating)}
                        <span className="text-sm text-muted-foreground ml-1">
                          {contractor.rating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {contractor.completedJobs} работ
                      </span>
                    </div>
                    
                    <div className="text-sm">
                      <span className="font-medium">
                        {contractor.rate.toLocaleString('ru-RU')} ₽
                      </span>
                      <span className="text-muted-foreground">
                        /{contractor.rateType === "hour" ? "час" : "день"}
                      </span>
                    </div>
                  </div>
                  
                  {contractor.notes && (
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                      {contractor.notes}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContractors.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <HardHat className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Подрядчики не найдены</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterSpecialization !== "all" || filterStatus !== "all"
                ? "Попробуйте изменить параметры поиска или фильтры"
                : "Добавьте первого подрядчика для начала работы"
              }
            </p>
            {!searchTerm && filterSpecialization === "all" && filterStatus === "all" && (
              <Button onClick={() => setIsAddModalOpen(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Добавить подрядчика
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      <AddContractorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddContractor={handleAddContractor}
      />
    </div>
  );
}