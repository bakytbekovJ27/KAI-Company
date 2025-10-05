import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { CheckCircle, Clock, Shield, Users } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Строим <span className="text-primary">надёжно</span> и{" "}
                <span className="text-accent">в срок</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Цифровая платформа для управления строительными проектами. 
                Полная прозрачность процесса, контроль качества и сроков.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-14 px-8">
                Рассчитать стоимость
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8">
                Посмотреть портфолио
              </Button>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6 pt-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4>Гарантия качества</h4>
                  <p className="text-sm text-muted-foreground">Контроль на каждом этапе</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4>Точные сроки</h4>
                  <p className="text-sm text-muted-foreground">Без задержек и переносов</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h4>Полная документация</h4>
                  <p className="text-sm text-muted-foreground">Все разрешения и сертификаты</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-chart-4/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-chart-4" />
                </div>
                <div>
                  <h4>Опытная команда</h4>
                  <p className="text-sm text-muted-foreground">Более 15 лет опыта</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <Card className="overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1619486216985-ba6dd488738b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBidWlsZGluZyUyMHNpdGV8ZW58MXx8fHwxNzU5NjQzNTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Строительная площадка"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
            </Card>
            
            {/* Floating Stats */}
            <Card className="absolute -bottom-6 -left-6 p-6 bg-background/95 backdrop-blur shadow-lg">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">150+</div>
                <div className="text-sm text-muted-foreground">Завершённых проектов</div>
              </div>
            </Card>
            
            <Card className="absolute -top-6 -right-6 p-6 bg-background/95 backdrop-blur shadow-lg">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-accent">98%</div>
                <div className="text-sm text-muted-foreground">Довольных клиентов</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}