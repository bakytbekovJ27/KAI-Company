import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClient: (client: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    type: "individual" | "company";
    inn?: string;
    notes?: string;
    avatar?: string;
  }) => void;
}

export function AddClientModal({ isOpen, onClose, onAddClient }: AddClientModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    type: "individual" as "individual" | "company",
    inn: "",
    notes: "",
    avatar: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "ФИО или название компании обязательно";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон обязателен";
    }

    if (formData.type === "company" && formData.inn && formData.inn.length !== 10) {
      newErrors.inn = "ИНН должен содержать 10 цифр";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form
    onAddClient({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address || undefined,
      type: formData.type,
      inn: formData.inn || undefined,
      notes: formData.notes || undefined,
      avatar: formData.avatar || undefined
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      type: "individual",
      inn: "",
      notes: "",
      avatar: ""
    });
    setErrors({});
    
    toast.success("Клиент успешно добавлен!");
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      type: "individual",
      inn: "",
      notes: "",
      avatar: ""
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Добавить клиента</DialogTitle>
          <DialogDescription>
            Заполните информацию о новом клиенте
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo */}
          <div className="space-y-2">
            <Label>Фото профиля</Label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                {formData.avatar ? (
                  <img 
                    src={formData.avatar} 
                    alt="Avatar" 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <Upload className="w-6 h-6 text-muted-foreground" />
                )}
              </div>
              <Button type="button" variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Загрузить фото
              </Button>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              ФИО / Название компании <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={errors.name ? "border-destructive" : ""}
              placeholder="Введите ФИО или название компании"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={errors.email ? "border-destructive" : ""}
              placeholder="example@email.com"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">
              Телефон <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={errors.phone ? "border-destructive" : ""}
              placeholder="+7 999 123-45-67"
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone}</p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Адрес</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Введите адрес"
            />
          </div>

          {/* Client Type */}
          <div className="space-y-3">
            <Label>Тип клиента</Label>
            <RadioGroup
              value={formData.type}
              onValueChange={(value) => handleInputChange("type", value)}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="individual" id="individual" />
                <Label htmlFor="individual">Физическое лицо</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="company" id="company" />
                <Label htmlFor="company">Юридическое лицо</Label>
              </div>
            </RadioGroup>
          </div>

          {/* INN (for companies) */}
          {formData.type === "company" && (
            <div className="space-y-2">
              <Label htmlFor="inn">ИНН (для юр. лиц)</Label>
              <Input
                id="inn"
                value={formData.inn}
                onChange={(e) => handleInputChange("inn", e.target.value)}
                className={errors.inn ? "border-destructive" : ""}
                placeholder="1234567890"
                maxLength={10}
              />
              {errors.inn && (
                <p className="text-sm text-destructive">{errors.inn}</p>
              )}
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Примечания</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Дополнительная информация о клиенте..."
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Отмена
            </Button>
            <Button type="submit">
              Добавить клиента
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}