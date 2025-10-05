import { Button } from "../components/ui/button";
import { Moon, Sun, Menu } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
  onLoginClick: () => void;
}

export function Header({ isDark, onThemeToggle, onLoginClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-primary">StroyControl</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
            Услуги
          </a>
          <a href="#portfolio" className="text-muted-foreground hover:text-foreground transition-colors">
            Портфолио
          </a>
          <a href="#calculator" className="text-muted-foreground hover:text-foreground transition-colors">
            Калькулятор
          </a>
          <a href="#reviews" className="text-muted-foreground hover:text-foreground transition-colors">
            Отзывы
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
            Контакты
          </a>
        </nav>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onThemeToggle}
            className="h-9 w-9 rounded-md"
          >
            {isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" onClick={onLoginClick}>Войти</Button>
            <Button>Рассчитать стоимость</Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9 rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
              Услуги
            </a>
            <a href="#portfolio" className="text-muted-foreground hover:text-foreground transition-colors">
              Портфолио
            </a>
            <a href="#calculator" className="text-muted-foreground hover:text-foreground transition-colors">
              Калькулятор
            </a>
            <a href="#reviews" className="text-muted-foreground hover:text-foreground transition-colors">
              Отзывы
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Контакты
            </a>
            <div className="flex flex-col space-y-2 pt-4 border-t border-border">
              <Button variant="ghost" className="justify-start" onClick={onLoginClick}>Войти</Button>
              <Button className="justify-start">Рассчитать стоимость</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}