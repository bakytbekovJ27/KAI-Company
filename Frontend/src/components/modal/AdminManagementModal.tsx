import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { toast } from "sonner";
import { UserPlus, Trash2, LogIn, Eye, EyeOff } from "lucide-react";

interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  isMain: boolean;
}

interface AdminManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockAdmins: Admin[] = [
  {
    id: "1",
    name: "Администратор",
    email: "admin@stroycontrol.ru",
    role: "Главный администратор",
    permissions: ["projects", "clients", "contractors", "reports", "delete"],
    isMain: true
  },
  {
    id: "2",
    name: "Мария Иванова",
    email: "maria@stroycontrol.ru",
    role: "Администратор",
    permissions: ["projects", "clients", "contractors", "reports"],
    isMain: false
  }
];

const availablePermissions = [
  { key: "projects", label: "Управление проектами" },
  { key: "clients", label: "Управление клиентами" },
  { key: "contractors", label: "Управление подрядчиками" },
  { key: "reports", label: "Финансовые отчеты" },
  { key: "delete", label: "Удаление данных" }
];

export function AdminManagementModal({ isOpen, onClose }: AdminManagementModalProps) {
  const [admins, setAdmins] = useState<Admin[]>(mockAdmins);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [newAdminData, setNewAdminData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    permissions: [] as string[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleDeleteAdmin = (adminId: string) => {
    const admin = admins.find(a => a.id === adminId);
    if (admin?.isMain) {
      toast.error("Нельзя удалить главного администратора");
      return;
    }

    setAdmins(prev => prev.filter(a => a.id !== adminId));
    toast.success(`Администратор ${admin?.name} удален`);
  };

  const handleLoginAsAdmin = (admin: Admin) => {
    toast.success(`Вход выполнен как ${admin.name}`);
    onClose();
  };

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!newAdminData.name.trim()) {
      newErrors.name = "ФИО обязательно";
    }
    
    if (!newAdminData.email.trim()) {
      newErrors.email = "Email обязателен";
    } else if (!/\S+@\S+\.\S+/.test(newAdminData.email)) {
      newErrors.email = "Введите корректный email";
    } else if (admins.some(admin => admin.email === newAdminData.email)) {
      newErrors.email = "Администратор с таким email уже существует";
    }
    
    if (!newAdminData.password) {
      newErrors.password = "Пароль обязателен";
    } else if (newAdminData.password.length < 6) {
      newErrors.password = "Пароль должен содержать минимум 6 символов";
    }
    
    if (newAdminData.password !== newAdminData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    if (newAdminData.permissions.length === 0) {
      newErrors.permissions = "Выберите хотя бы одно право доступа";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newAdmin: Admin = {
      id: Date.now().toString(),
      name: newAdminData.name,
      email: newAdminData.email,
      role: "Администратор",
      permissions: newAdminData.permissions,
      isMain: false
    };

    setAdmins(prev => [...prev, newAdmin]);
    
    // Reset form
    setNewAdminData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      permissions: []
    });
    setErrors({});
    setShowAddForm(false);
    
    toast.success("Администратор успешно добавлен!");
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setNewAdminData(prev => ({
      ...prev,
      permissions: checked 
        ? [...prev.permissions, permission]
        : prev.permissions.filter(p => p !== permission)
    }));
    
    if (errors.permissions) {
      setErrors(prev => ({ ...prev, permissions: "" }));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewAdminData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Управление администраторами</DialogTitle>
          <DialogDescription>
            Просмотр и управление учетными записями администраторов
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Admins */}
          <div className="space-y-4">
            <h3 className="font-semibold">Текущие администраторы:</h3>
            
            {admins.map((admin) => (
              <Card key={admin.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(admin.name)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{admin.name}</h4>
                          {admin.isMain && (
                            <Badge variant="default" className="text-xs">
                              Главный
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {admin.email}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {admin.role}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLoginAsAdmin(admin)}
                      >
                        <LogIn className="w-4 h-4 mr-1" />
                        Войти
                      </Button>
                      
                      {!admin.isMain && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteAdmin(admin.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add New Admin */}
          {!showAddForm ? (
            <Button
              onClick={() => setShowAddForm(true)}
              className="w-full"
              variant="outline"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Добавить нового администратора
            </Button>
          ) : (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Добавить администратора</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowAddForm(false);
                      setErrors({});
                      setNewAdminData({
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        permissions: []
                      });
                    }}
                  >
                    ✕
                  </Button>
                </div>

                <form onSubmit={handleAddAdmin} className="space-y-4">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="admin-name">
                      ФИО <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="admin-name"
                      value={newAdminData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={errors.name ? "border-destructive" : ""}
                      placeholder="Введите ФИО"
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="admin-email"
                      type="email"
                      value={newAdminData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={errors.email ? "border-destructive" : ""}
                      placeholder="admin@stroycontrol.ru"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">
                      Пароль <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="admin-password"
                        type={showPassword ? "text" : "password"}
                        value={newAdminData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className={errors.password ? "border-destructive" : ""}
                        placeholder="Введите пароль"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-destructive">{errors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="admin-confirm-password">
                      Подтвердите пароль <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="admin-confirm-password"
                      type="password"
                      value={newAdminData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className={errors.confirmPassword ? "border-destructive" : ""}
                      placeholder="Повторите пароль"
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Permissions */}
                  <div className="space-y-3">
                    <Label>
                      Права доступа <span className="text-destructive">*</span>
                    </Label>
                    <div className="space-y-2">
                      {availablePermissions.map((permission) => (
                        <div key={permission.key} className="flex items-center space-x-2">
                          <Checkbox
                            id={`permission-${permission.key}`}
                            checked={newAdminData.permissions.includes(permission.key)}
                            onCheckedChange={(checked) => 
                              handlePermissionChange(permission.key, checked as boolean)
                            }
                          />
                          <Label 
                            htmlFor={`permission-${permission.key}`}
                            className="text-sm font-normal"
                          >
                            {permission.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.permissions && (
                      <p className="text-sm text-destructive">{errors.permissions}</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowAddForm(false);
                        setErrors({});
                        setNewAdminData({
                          name: "",
                          email: "",
                          password: "",
                          confirmPassword: "",
                          permissions: []
                        });
                      }}
                    >
                      Отмена
                    </Button>
                    <Button type="submit">
                      Создать админа
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Close Button */}
          <div className="flex justify-end pt-4">
            <Button onClick={onClose}>Закрыть</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}