import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";
import { Upload, Star } from "lucide-react";

interface AddContractorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddContractor: (contractor: {
    name: string;
    email?: string;
    phone: string;
    specialization: string;
    rate: number;
    rateType: "hour" | "day";
    rating: number;
    notes?: string;
    avatar?: string;
  }) => void;
}

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

export function AddContractorModal({ isOpen, onClose, onAddContractor }: AddContractorModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    rate: "",
    rateType: "hour" as "hour" | "day",
    rating: 5,
    notes: "",
    avatar: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "ФИО обязательно";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон обязателен";
    }

    if (!formData.specialization) {
      newErrors.specialization = "Выберите специализацию";
    }

    if (!formData.rate || parseFloat(formData.rate) <= 0) {
      newErrors.rate = "Укажите корректную ставку";
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form
    onAddContractor({
      name: formData.name,
      email: formData.email || undefined,
      phone: formData.phone,
      specialization: formData.specialization,
      rate: parseFloat(formData.rate),
      rateType: formData.rateType,
      rating: formData.rating,
      notes: formData.notes || undefined,
      avatar: formData.avatar || undefined
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      specialization: "",
      rate: "",
      rateType: "hour",
      rating: 5,
      notes: "",
      avatar: ""
    });
    setErrors({});
    
    toast.success("Подрядчик успешно добавлен!");
    onClose();
  };

  const handleInputChange = (field: string, value: string | number) => {
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
      specialization: "",
      rate: "",
      rateType: "hour",
      rating: 5,
      notes: "",
      avatar: ""
    });
    setErrors({});
    onClose();
  };

  const renderStarRating = () => {
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleInputChange("rating", i + 1)}
            className="p-0 border-0 bg-transparent hover:scale-110 transition-transform"
          >
            <Star
              className={`h-5 w-5 ${
                i < formData.rating 
                  ? "fill-yellow-400 text-yellow-400" 
                  : "text-muted-foreground hover:text-yellow-400"
              }`}
            />
          </button>
        ))}
        <span className="text-sm text-muted-foreground ml-2">
          ({formData.rating}/5)
        </span>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Добавить подрядчика</DialogTitle>
          <DialogDescription>
            Заполните информацию о новом подрядчике
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
              ФИО <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={errors.name ? "border-destructive" : ""}
              placeholder="Введите ФИО"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Specialization */}
          <div className="space-y-2">
            <Label htmlFor="specialization">
              Специализация <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.specialization}
              onValueChange={(value) => handleInputChange("specialization", value)}
            >
              <SelectTrigger className={errors.specialization ? "border-destructive" : ""}>
                <SelectValue placeholder="Выберите специализацию" />
              </SelectTrigger>
              <SelectContent>
                {specializations.map(spec => (
                  <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.specialization && (
              <p className="text-sm text-destructive">{errors.specialization}</p>
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

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
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

          {/* Rate */}
          <div className="space-y-2">
            <Label htmlFor="rate">
              Ставка <span className="text-destructive">*</span>
            </Label>
            <div className="flex space-x-2">
              <Input
                id="rate"
                type="number"
                value={formData.rate}
                onChange={(e) => handleInputChange("rate", e.target.value)}
                className={`flex-1 ${errors.rate ? "border-destructive" : ""}`}
                placeholder="1000"
                min="0"
                step="50"
              />
              <Select
                value={formData.rateType}
                onValueChange={(value) => handleInputChange("rateType", value)}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hour">час</SelectItem>
                  <SelectItem value="day">день</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {errors.rate && (
              <p className="text-sm text-destructive">{errors.rate}</p>
            )}
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <Label>Рейтинг выполненных работ</Label>
            {renderStarRating()}
            <p className="text-xs text-muted-foreground">
              Автоматически рассчитывается на основе отзывов
            </p>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Примечания</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Дополнительная информация о подрядчике..."
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Отмена
            </Button>
            <Button type="submit">
              Добавить подрядчика
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}