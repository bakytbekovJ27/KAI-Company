import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Александр Петров",
    role: "Владелец жилого комплекса",
    project: "ЖК \"Современность\"",
    rating: 5,
    text: "Отличная работа команды StroyControl! Проект был завершён точно в срок, качество работ на высшем уровне. Особенно впечатлила система отслеживания прогресса - всегда знал, на каком этапе находится строительство.",
    initials: "АП"
  },
  {
    id: 2, 
    name: "Мария Иванова",
    role: "Директор по развитию",
    project: "Бизнес-центр \"Столица\"",
    rating: 5,
    text: "Профессиональный подход к каждой детали. Цифровая платформа позволила нам экономить время на координации работ. Рекомендуем как надёжного партнёра для крупных коммерческих проектов.",
    initials: "МИ"
  },
  {
    id: 3,
    name: "Дмитрий Сидоров", 
    role: "Частный застройщик",
    project: "Загородный дом",
    rating: 5,
    text: "Строили загородный дом. Понравилось, что можно было отслеживать каждый этап через приложение, получать фотоотчёты. Все работы выполнены качественно, без нареканий. Спасибо за профессионализм!",
    initials: "ДС"
  }
];

export function Reviews() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-accent text-accent" : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <section id="reviews" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Отзывы клиентов</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Нас рекомендуют за качество работ, соблюдение сроков и прозрачность процессов
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <Card key={review.id} className="relative">
              <CardContent className="p-6">
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                  <Quote className="w-4 h-4 text-accent" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(review.rating)}
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    "{review.text}"
                  </p>
                  
                  <div className="flex items-center space-x-4 pt-4 border-t border-border">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {review.initials}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold">{review.name}</h4>
                      <p className="text-sm text-muted-foreground">{review.role}</p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {review.project}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="grid sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-sm text-muted-foreground">Средняя оценка</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">150+</div>
              <div className="text-sm text-muted-foreground">Отзывов клиентов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Рекомендуют нас</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}