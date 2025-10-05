import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Calendar, MapPin, Users } from "lucide-react";

const portfolioProjects = [
  {
    id: 1,
    title: "Жилой комплекс \"Современность\"",
    location: "г. Москва, ул. Новая",
    type: "Жилое строительство",
    status: "Завершён",
    duration: "18 месяцев",
    apartments: 120,
    image: "https://images.unsplash.com/photo-1703014172880-a9ad043097c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTk1Njg0MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    title: "Бизнес-центр \"Столица\"",  
    location: "г. Санкт-Петербург",
    type: "Коммерческое строительство",
    status: "В процессе",
    duration: "24 месяца",
    apartments: null,
    image: "https://images.unsplash.com/photo-1642041520133-7533ea85cd27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc1OTYxMzUyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    title: "Загородный посёлок \"Уют\"",
    location: "Московская область",
    type: "Коттеджное строительство", 
    status: "Завершён",
    duration: "12 месяцев",
    apartments: 45,
    image: "https://images.unsplash.com/photo-1619486216985-ba6dd488738b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBidWlsZGluZyUyMHNpdGV8ZW58MXx8fHwxNzU5NjQzNTM0fDA&ixLib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Наше портфолио</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Более 150 успешно реализованных проектов разного масштаба и сложности
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge 
                    variant={project.status === "Завершён" ? "default" : "secondary"}
                    className={project.status === "Завершён" ? "bg-success text-success-foreground" : ""}
                  >
                    {project.status}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 line-clamp-2">{project.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {project.type}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{project.duration}</span>
                    </div>
                    
                    {project.apartments && (
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{project.apartments} квартир</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Badge variant="outline" className="px-6 py-2">
            И это ещё не всё! Смотрите полное портфолио в нашем каталоге
          </Badge>
        </div>
      </div>
    </section>
  );
}