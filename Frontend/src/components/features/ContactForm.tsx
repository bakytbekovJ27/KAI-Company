import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.projectType) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }
    
    // Simulate form submission
    toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
    
    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      projectType: "",
      message: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Свяжитесь с нами</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Готовы обсудить ваш проект? Оставьте заявку, и мы свяжемся с вами в течение часа
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Оставить заявку</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Ваше имя"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+7 (999) 123-45-67"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Тип проекта *</Label>
                  <Select value={formData.projectType} onValueChange={(value) => handleInputChange("projectType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип проекта" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Жилое строительство</SelectItem>
                      <SelectItem value="commercial">Коммерческое строительство</SelectItem>
                      <SelectItem value="industrial">Промышленное строительство</SelectItem>
                      <SelectItem value="renovation">Реконструкция</SelectItem>
                      <SelectItem value="consultation">Консультация</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Описание проекта</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Расскажите подробнее о вашем проекте..."
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full h-12" size="lg">
                  <Send className="w-4 h-4 mr-2" />
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-6">Контактная информация</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">+7 (495) 123-45-67</div>
                      <div className="text-sm text-muted-foreground">Ежедневно с 9:00 до 21:00</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-medium">info@stroycontrol.ru</div>
                      <div className="text-sm text-muted-foreground">Ответим в течение часа</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <div className="font-medium">г. Москва, ул. Строителей, д. 15</div>
                      <div className="text-sm text-muted-foreground">Офис открыт пн-пт 9:00-18:00</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Преимущества работы с нами</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Бесплатная консультация и предварительный расчёт</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Выезд специалиста на объект в течение 24 часов</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Прозрачная отчётность на каждом этапе работ</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Гарантия на все виды работ до 5 лет</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}