import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Apple, Plus, Coffee, Sun, Moon, Droplets } from "lucide-react";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

interface MealLog {
  id: string;
  meal: string;
  food: string;
  calories: number;
  time: string;
}

const Nutrition = () => {
  const [meals, setMeals] = useState<MealLog[]>([
    { id: "1", meal: "เช้า", food: "ข้าวไข่เจียว + นมสด", calories: 450, time: "07:30" },
    { id: "2", meal: "กลางวัน", food: "ข้าวผัดไก่ + น้ำส้ม", calories: 680, time: "12:30" },
    { id: "3", meal: "ว่าง", food: "กล้วย + โยเกิร์ต", calories: 220, time: "15:00" },
  ]);

  const [waterIntake, setWaterIntake] = useState(1500); // ml
  const waterGoal = 2000; // ml
  const caloriesGoal = 2000;
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    meal: "",
    food: "",
    calories: "",
  });

  const mealTypes = [
    { value: "เช้า", icon: Sun, color: "text-yellow-500" },
    { value: "กลางวัน", icon: Sun, color: "text-orange-500" },
    { value: "เย็น", icon: Moon, color: "text-purple-500" },
    { value: "ว่าง", icon: Coffee, color: "text-brown-500" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMeal: MealLog = {
      id: Date.now().toString(),
      meal: formData.meal,
      food: formData.food,
      calories: parseInt(formData.calories),
      time: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }),
    };
    setMeals([...meals, newMeal]);
    setFormData({ meal: "", food: "", calories: "" });
    setIsDialogOpen(false);
    toast.success("บันทึกอาหารสำเร็จ!");
  };

  const addWater = (amount: number) => {
    const newAmount = Math.min(waterIntake + amount, waterGoal);
    setWaterIntake(newAmount);
    toast.success(`เพิ่มน้ำ ${amount} มล.`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="md:ml-64 pt-16 md:pt-0 pb-20 md:pb-0">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8 animate-fade-in">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">โภชนาการ</h1>
              <p className="text-muted-foreground">ติดตามการบริโภคอาหารและน้ำรายวัน</p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2">
                  <Plus className="h-5 w-5" />
                  <span className="hidden sm:inline">บันทึกอาหาร</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>บันทึกอาหาร</DialogTitle>
                  <DialogDescription>กรอกรายละเอียดมื้ออาหารของคุณ</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>มื้ออาหาร</Label>
                    <Select value={formData.meal} onValueChange={(value) => setFormData({ ...formData, meal: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกมื้อ" />
                      </SelectTrigger>
                      <SelectContent>
                        {mealTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="food">รายการอาหาร</Label>
                    <Input
                      id="food"
                      required
                      placeholder="เช่น ข้าวผัดไก่, สลัด, ..."
                      value={formData.food}
                      onChange={(e) => setFormData({ ...formData, food: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="calories">แคลอรี่ (kcal)</Label>
                    <Input
                      id="calories"
                      type="number"
                      required
                      placeholder="จำนวนแคลอรี่"
                      value={formData.calories}
                      onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                    />
                  </div>

                  <Button type="submit" className="w-full">บันทึก</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Calories Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="animate-scale-in">
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-1">แคลอรี่วันนี้</div>
                <div className="text-3xl font-bold text-primary mb-2">{totalCalories}</div>
                <Progress value={(totalCalories / caloriesGoal) * 100} className="h-2" />
                <div className="text-xs text-muted-foreground mt-2">เป้าหมาย: {caloriesGoal} kcal</div>
              </CardContent>
            </Card>

            <Card className="animate-scale-in" style={{ animationDelay: "100ms" }}>
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-1">เหลือแคลอรี่</div>
                <div className="text-3xl font-bold text-secondary mb-2">
                  {Math.max(0, caloriesGoal - totalCalories)}
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  {totalCalories > caloriesGoal ? "เกินเป้าหมายแล้ว" : "ยังบริโภคได้"}
                </div>
              </CardContent>
            </Card>

            <Card className="animate-scale-in" style={{ animationDelay: "200ms" }}>
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-1">มื้ออาหาร</div>
                <div className="text-3xl font-bold text-accent mb-2">{meals.length}</div>
                <div className="text-xs text-muted-foreground mt-2">มื้อทั้งหมดวันนี้</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Meals Log */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Apple className="h-5 w-5 text-primary" />
                  มื้ออาหารวันนี้
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {meals.map((meal) => {
                    const mealType = mealTypes.find((t) => t.value === meal.meal);
                    return (
                      <div
                        key={meal.id}
                        className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        {mealType && (
                          <div className={`${mealType.color}`}>
                            <mealType.icon className="h-6 w-6" />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="font-medium">{meal.food}</div>
                          <div className="text-sm text-muted-foreground">
                            {meal.meal} • {meal.time}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary">{meal.calories}</div>
                          <div className="text-xs text-muted-foreground">kcal</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Water Intake */}
            <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-cyan-500" />
                  การดื่มน้ำ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-cyan-500 mb-2">
                      {(waterIntake / 1000).toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground mb-4">
                      จาก {(waterGoal / 1000).toFixed(1)} ลิตร
                    </div>
                    <Progress value={(waterIntake / waterGoal) * 100} className="h-3" />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <Button variant="outline" onClick={() => addWater(250)} className="flex-col h-auto py-4">
                      <Droplets className="h-6 w-6 mb-1 text-cyan-500" />
                      <span className="text-xs">แก้ว</span>
                      <span className="text-xs font-bold">250ml</span>
                    </Button>
                    <Button variant="outline" onClick={() => addWater(500)} className="flex-col h-auto py-4">
                      <Droplets className="h-7 w-7 mb-1 text-cyan-500" />
                      <span className="text-xs">ขวด</span>
                      <span className="text-xs font-bold">500ml</span>
                    </Button>
                    <Button variant="outline" onClick={() => addWater(1000)} className="flex-col h-auto py-4">
                      <Droplets className="h-8 w-8 mb-1 text-cyan-500" />
                      <span className="text-xs">ขวดใหญ่</span>
                      <span className="text-xs font-bold">1L</span>
                    </Button>
                  </div>

                  {waterIntake >= waterGoal && (
                    <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-center animate-fade-in">
                      <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
                        🎉 ยินดีด้วย! คุณดื่มน้ำครบเป้าหมายแล้ว
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nutrition Tips */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>เคล็ดลับโภชนาการ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-2xl mb-2">🥗</div>
                  <h3 className="font-semibold mb-1">กินผักผลไม้</h3>
                  <p className="text-sm text-muted-foreground">ควรกินผักผลไม้วันละ 400-500 กรัม</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="text-2xl mb-2">💧</div>
                  <h3 className="font-semibold mb-1">ดื่มน้ำเยอะๆ</h3>
                  <p className="text-sm text-muted-foreground">ดื่มน้ำวันละ 8-10 แก้ว หรือ 2 ลิตร</p>
                </div>
                <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <div className="text-2xl mb-2">🍖</div>
                  <h3 className="font-semibold mb-1">โปรตีนเพียงพอ</h3>
                  <p className="text-sm text-muted-foreground">กินโปรตีนวันละ 50-70 กรัม</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Nutrition;
