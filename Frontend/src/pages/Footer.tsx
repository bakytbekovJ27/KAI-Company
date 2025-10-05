import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">StroyControl</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Цифровая платформа для управления строительными проектами. 
              Строим надёжно, качественно и в срок уже более 15 лет.
            </p>
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                <Facebook className="w-4 h-4 text-primary" />
              </div>
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                <Instagram className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold">Услуги</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Жилое строительство</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Коммерческое строительство</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Промышленное строительство</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Реконструкция</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Проектирование</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold">Компания</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">О нас</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Команда</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Вакансии</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Лицензии</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Партнёры</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Контакты</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+7 (495) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>info@stroycontrol.ru</span>
              </div>
              <div className="flex items-start space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>г. Москва, ул. Строителей, д. 15</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 StroyControl. Все права защищены.
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-foreground transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}