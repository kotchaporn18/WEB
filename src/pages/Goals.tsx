import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Target, Plus, TrendingDown, TrendingUp, Activity } from "lucide-react";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

interface Goal {
  id: string;
  type: string;
  title: string;
  current: number;
  target: number;
  unit: string;
  deadline: string;
  icon: any;
  color: string;
}

const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      type: "weight",
      title: "ลดน้ำหนัก",
      current: 72,
      target: 68,
      unit: "kg",
      deadline: "2024-03-31",
      icon: TrendingDown,
      color: "text-green-500",
    },
    {
      id: "2",
      type: "exercise",
      title: "ออกกำลังกายรายสัปดาห์",
      current: 4,
      target: 5,
      unit: "ครั้ง",
      deadline: "2024-12-31",
      icon: Activity,
      color: "text-blue-500",
    },
    {
      id: "3",
      type: "muscle",
      title: "เพิ่มกล้ามเนื้อ",
      current: 55,
      target: 60,
      unit: "kg",
      deadline: "2024-06-30",
      icon: TrendingUp,
      color: "text-orange-500",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    current: "",
    target: "",
    unit: "",
    deadline: "",
  });

  const goalTypes = [
    { value: "weight", label: "ลดน้ำหนัก", icon: TrendingDown, color: "text-green-500" },
    { value: "muscle", label: "เพิ่มกล้ามเนื้อ", icon: TrendingUp, color: "text-orange-500" },
    { value: "exercise", label: "ออกกำลังกาย", icon: Activity, color: "text-blue-500" },
    { value: "health", label: "สุขภาพทั่วไป", icon: Target, color: "text-purple-500" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const goalType = goalTypes.find((t) => t.value === formData.type);
    const newGoal: Goal = {
      id: Date.now().toString(),
      ...formData,
      current: parseFloat(formData.current),
      target: parseFloat(formData.target),
      icon: goalType?.icon || Target,
      color: goalType?.color || "text-primary",
    };
    setGoals([...goals, newGoal]);
    setFormData({ type: "", title: "", current: "", target: "", unit: "", deadline: "" });
    setIsDialogOpen(false);
    toast.success("สร้างเป้าหมายสำเร็จ!");
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const calculateDaysLeft = (deadline: string) => {
    const now = new Date();
    const end = new Date(deadline);
    const diff = end.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="md:ml-64 pt-16 md:pt-0 pb-20 md:pb-0">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8 animate-fade-in">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">เป้าหมายของฉัน</h1>
              <p className="text-muted-foreground">ตั้งเป้าหมายและติดตามความก้าวหน้า</p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2">
                  <Plus className="h-5 w-5" />
                  <span className="hidden sm:inline">เพิ่มเป้าหมาย</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>สร้างเป้าหมายใหม่</DialogTitle>
                  <DialogDescription>กำหนดเป้าหมายสุขภาพของคุณ</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>ประเภทเป้าหมาย</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกประเภท" />
                      </SelectTrigger>
                      <SelectContent>
                        {goalTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">ชื่อเป้าหมาย</Label>
                    <Input
                      id="title"
                      required
                      placeholder="เช่น ลดน้ำหนัก 5 กก."
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current">ค่าปัจจุบัน</Label>
                      <Input
                        id="current"
                        type="number"
                        step="0.1"
                        required
                        value={formData.current}
                        onChange={(e) => setFormData({ ...formData, current: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target">เป้าหมาย</Label>
                      <Input
                        id="target"
                        type="number"
                        step="0.1"
                        required
                        value={formData.target}
                        onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">หน่วย</Label>
                    <Input
                      id="unit"
                      required
                      placeholder="เช่น kg, ครั้ง, นาที"
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline">กำหนดเวลา</Label>
                    <Input
                      id="deadline"
                      type="date"
                      required
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    />
                  </div>

                  <Button type="submit" className="w-full">สร้างเป้าหมาย</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="animate-scale-in">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary mb-1">{goals.length}</div>
                <div className="text-sm text-muted-foreground">เป้าหมายทั้งหมด</div>
              </CardContent>
            </Card>
            <Card className="animate-scale-in" style={{ animationDelay: "100ms" }}>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-green-500 mb-1">
                  {goals.filter((g) => calculateProgress(g.current, g.target) >= 80).length}
                </div>
                <div className="text-sm text-muted-foreground">ใกล้สำเร็จ</div>
              </CardContent>
            </Card>
            <Card className="animate-scale-in" style={{ animationDelay: "200ms" }}>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-blue-500 mb-1">
                  {goals.filter((g) => calculateProgress(g.current, g.target) >= 50 && calculateProgress(g.current, g.target) < 80).length}
                </div>
                <div className="text-sm text-muted-foreground">กำลังดำเนินการ</div>
              </CardContent>
            </Card>
            <Card className="animate-scale-in" style={{ animationDelay: "300ms" }}>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-orange-500 mb-1">
                  {Math.round(
                    goals.reduce((sum, g) => sum + calculateProgress(g.current, g.target), 0) / goals.length
                  )}%
                </div>
                <div className="text-sm text-muted-foreground">ความสำเร็จเฉลี่ย</div>
              </CardContent>
            </Card>
          </div>

          {/* Goals List */}
          <div className="grid md:grid-cols-2 gap-6">
            {goals.map((goal, index) => {
              const progress = calculateProgress(goal.current, goal.target);
              const daysLeft = calculateDaysLeft(goal.deadline);
              
              return (
                <Card key={goal.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <goal.icon className={`h-6 w-6 ${goal.color}`} />
                      {goal.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">ความก้าวหน้า</span>
                        <span className="text-sm font-medium">
                          {goal.current} / {goal.target} {goal.unit}
                        </span>
                      </div>
                      <Progress value={progress} className="h-3" />
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-muted-foreground">{progress.toFixed(0)}% สำเร็จ</span>
                        <span className="text-xs text-muted-foreground">
                          {daysLeft > 0 ? `เหลือ ${daysLeft} วัน` : "หมดเวลาแล้ว"}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="text-sm text-muted-foreground mb-1">สถานะ</div>
                      <div className="flex items-center gap-2">
                        {progress >= 80 ? (
                          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-sm font-medium">ใกล้สำเร็จแล้ว! 🎯</span>
                          </div>
                        ) : progress >= 50 ? (
                          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-sm font-medium">กำลังดำเนินการ 💪</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                            <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                            <span className="text-sm font-medium">เริ่มต้นกันเถอะ! 🚀</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">อัพเดท</Button>
                      <Button variant="outline" className="flex-1">ลบ</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Motivation Section */}
          <Card className="mt-8 animate-fade-in">
            <CardHeader>
              <CardTitle>แรงบันดาลใจ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 rounded-lg bg-gradient-primary text-white">
                  <div className="text-4xl mb-3">💪</div>
                  <h3 className="text-xl font-bold mb-2">ความสำเร็จเล็กๆ</h3>
                  <p className="text-white/90">
                    ทุกก้าวเล็กๆ นำไปสู่ความสำเร็จใหญ่ อย่าลืมฉลองความก้าวหน้าของคุณ!
                  </p>
                </div>
                <div className="p-6 rounded-lg bg-gradient-card border">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="text-xl font-bold mb-2">ความมุ่งมั่น</h3>
                  <p className="text-muted-foreground">
                    ความมุ่งมั่นและความสม่ำเสมอคือกุญแจสำคัญในการบรรลุเป้าหมาย
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Goals;
