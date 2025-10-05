import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Slider } from "../ui/slider";
import { Calculator as CalculatorIcon, Home, Building, Warehouse } from "lucide-react";

export function Calculator() {
  const [projectType, setProjectType] = useState("");
  const [area, setArea] = useState([100]);
  const [floors, setFloors] = useState([1]);
  const [materials, setMaterials] = useState("");
  const [timeline, setTimeline] = useState("");
  
  const calculateCost = () => {
    let baseCost = 0;
    
    // Base cost per square meter by project type
    switch (projectType) {
      case "residential":
        baseCost = 45000;
        break;
      case "commercial":
        baseCost = 60000;
        break;
      case "industrial":
        baseCost = 35000;
        break;
      default:
        baseCost = 45000;
    }
    
    // Material multiplier
    const materialMultiplier = materials === "premium" ? 1.4 : materials === "standard" ? 1.2 : 1;
    
    // Timeline multiplier (urgent projects cost more)
    const timelineMultiplier = timeline === "urgent" ? 1.3 : timeline === "standard" ? 1.1 : 1;
    
    const totalCost = area[0] * floors[0] * baseCost * materialMultiplier * timelineMultiplier;
    
    return Math.round(totalCost);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section id="calculator" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Калькулятор стоимости</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Получите предварительную стоимость вашего проекта за несколько кликов
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Calculator Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalculatorIcon className="w-5 h-5" />
                <span>Параметры проекта</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Тип проекта</Label>
                <Select value={projectType} onValueChange={setProjectType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип проекта" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">
                      <div className="flex items-center space-x-2">
                        <Home className="w-4 h-4" />
                        <span>Жилое строительство</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="commercial">
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4" />
                        <span>Коммерческое строительство</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="industrial">
                      <div className="flex items-center space-x-2">
                        <Warehouse className="w-4 h-4" />
                        <span>Промышленное строительство</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Площадь (м²): {area[0]}</Label>
                <Slider
                  value={area}
                  onValueChange={setArea}
                  max={1000}
                  min={50}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>50 м²</span>
                  <span>1000 м²</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Количество этажей: {floors[0]}</Label>
                <Slider
                  value={floors}
                  onValueChange={setFloors}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1 этаж</span>
                  <span>10 этажей</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Класс материалов</Label>
                <Select value={materials} onValueChange={setMaterials}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите класс материалов" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy">Эконом</SelectItem>
                    <SelectItem value="standard">Стандарт</SelectItem>
                    <SelectItem value="premium">Премиум</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Сроки выполнения</Label>
                <Select value={timeline} onValueChange={setTimeline}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите желаемые сроки" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="extended">Стандартные сроки</SelectItem>
                    <SelectItem value="standard">Ускоренные сроки</SelectItem>
                    <SelectItem value="urgent">Срочное выполнение</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle>Предварительная стоимость</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {projectType && materials && timeline ? (
                <>
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-primary">
                      {formatCurrency(calculateCost())}
                    </div>
                    <p className="text-muted-foreground">
                      Стоимость может варьироваться в зависимости от дополнительных требований
                    </p>
                  </div>

                  <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold">Включено в стоимость:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Проектирование и согласование</li>
                      <li>• Основные строительные работы</li>
                      <li>• Материалы выбранного класса</li>
                      <li>• Контроль качества на всех этапах</li>
                      <li>• Гарантийное обслуживание</li>
                    </ul>
                  </div>

                  <Button className="w-full h-12" size="lg">
                    Получить детальный расчёт
                  </Button>
                </>
              ) : (
                <div className="text-center space-y-4 py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <CalculatorIcon className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    Заполните параметры проекта, чтобы увидеть предварительную стоимость
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}