import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { AddClientModal } from "../modal/AddClientModal";
import { Search, Filter, UserPlus, Phone, Mail, Building, User } from "lucide-react";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  type: "individual" | "company";
  inn?: string;
  activeProjects: number;
  avatar?: string;
  notes?: string;
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Иван Петров",
    email: "ivan@example.com",
    phone: "+7 999 123-45-67",
    address: "ул. Ленина, 10, кв. 15",
    type: "individual",
    activeProjects: 3,
    notes: "Постоянный клиент, предпочитает современный дизайн"
  },
  {
    id: "2",
    name: "ООО \"СтройИнвест\"",
    email: "info@stroyinvest.ru",
    phone: "+7 495 123-45-67",
    address: "г. Москва, ул. Тверская, 15",
    type: "company",
    inn: "7701234567",
    activeProjects: 5,
    notes: "Крупный застройщик, работаем с 2020 года"
  },
  {
    id: "3",
    name: "Мария Сидорова",
    email: "maria@gmail.com",
    phone: "+7 916 987-65-43",
    address: "ул. Садовая, 25",
    type: "individual",
    activeProjects: 1,
    notes: "Первый проект - ремонт квартиры"
  }
];

export function ClientsSection() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.phone.includes(searchTerm);
    
    const matchesFilter = filterType === "all" || client.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const handleAddClient = (newClient: Omit<Client, "id" | "activeProjects">) => {
    const client: Client = {
      ...newClient,
      id: Date.now().toString(),
      activeProjects: 0
    };
    setClients(prev => [...prev, client]);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Клиенты</h1>
          <p className="text-muted-foreground">Управление базой клиентов</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Добавить клиента
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск по имени, email или телефону..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Фильтр" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все клиенты</SelectItem>
            <SelectItem value="individual">Физические лица</SelectItem>
            <SelectItem value="company">Юридические лица</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clients Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={client.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {getInitials(client.name)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold truncate">{client.name}</h3>
                    {client.type === "company" ? (
                      <Building className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <User className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="h-3 w-3 mr-1" />
                      <span className="truncate">{client.email}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="h-3 w-3 mr-1" />
                      <span>{client.phone}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <Badge variant={client.activeProjects > 0 ? "default" : "secondary"}>
                      {client.activeProjects} проект{client.activeProjects === 1 ? '' : client.activeProjects < 5 ? 'а' : 'ов'}
                    </Badge>
                    
                    {client.type === "company" && (
                      <Badge variant="outline" className="text-xs">
                        Юр. лицо
                      </Badge>
                    )}
                  </div>
                  
                  {client.notes && (
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                      {client.notes}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Клиенты не найдены</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterType !== "all" 
                ? "Попробуйте изменить параметры поиска или фильтры"
                : "Добавьте первого клиента для начала работы"
              }
            </p>
            {!searchTerm && filterType === "all" && (
              <Button onClick={() => setIsAddModalOpen(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Добавить клиента
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      <AddClientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddClient={handleAddClient}
      />
    </div>
  );
}