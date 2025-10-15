import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Activity, Plus, Edit, Trash2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";

interface ActivityLog {
  id: string;
  type: string;
  distance: string;
  duration: string;
  calories: string;
  date: string;
}

const Activities = () => {
  const [activities, setActivities] = useState<ActivityLog[]>([
    { id: "1", type: "วิ่ง", distance: "5.2", duration: "28", calories: "312", date: "2024-01-15T06:30" },
    { id: "2", type: "เดิน", distance: "3.1", duration: "45", calories: "108", date: "2024-01-15T18:00" },
    { id: "3", type: "ปั่นจักรยาน", distance: "12.5", duration: "35", calories: "245", date: "2024-01-14T07:00" },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    distance: "",
    duration: "",
    calories: "",
  });

  const activityTypes = [
    { value: "วิ่ง", icon: "🏃", caloriesPerKm: 60 },
    { value: "เดิน", icon: "🚶", caloriesPerKm: 35 },
    { value: "ปั่นจักรยาน", icon: "🚴", caloriesPerKm: 30 },
    { value: "ว่ายน้ำ", icon: "🏊", caloriesPerKm: 80 },
  ];

  const calculateCalories = () => {
    const activity = activityTypes.find((a) => a.value === formData.type);
    if (activity && formData.distance) {
      const calories = parseFloat(formData.distance) * activity.caloriesPerKm;
      setFormData({ ...formData, calories: calories.toFixed(0) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newActivity: ActivityLog = {
      id: Date.now().toString(),
      ...formData,
      date: new Date().toISOString(),
    };
    setActivities([newActivity, ...activities]);
    setFormData({ type: "", distance: "", duration: "", calories: "" });
    setIsDialogOpen(false);
    toast.success("บันทึกกิจกรรมสำเร็จ!");
  };

  const handleDelete = (id: string) => {
    setActivities(activities.filter((a) => a.id !== id));
    toast.success("ลบกิจกรรมสำเร็จ!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="md:ml-64 pt-16 md:pt-0 pb-20 md:pb-0">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8 animate-fade-in">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">กิจกรรมของฉัน</h1>
              <p className="text-muted-foreground">ติดตามและจัดการกิจกรรมออกกำลังกาย</p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2">
                  <Plus className="h-5 w-5" />
                  <span className="hidden sm:inline">เพิ่มกิจกรรม</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>บันทึกกิจกรรมใหม่</DialogTitle>
                  <DialogDescription>กรอกรายละเอียดการออกกำลังกายของคุณ</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>ประเภทกิจกรรม</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => {
                        setFormData({ ...formData, type: value });
                        setTimeout(calculateCalories, 100);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกประเภท" />
                      </SelectTrigger>
                      <SelectContent>
                        {activityTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <span className="flex items-center gap-2">
                              <span>{type.icon}</span>
                              <span>{type.value}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="distance">ระยะทาง (km)</Label>
                      <Input
                        id="distance"
                        type="number"
                        step="0.1"
                        required
                        value={formData.distance}
                        onChange={(e) => {
                          setFormData({ ...formData, distance: e.target.value });
                          setTimeout(calculateCalories, 100);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">ระยะเวลา (นาที)</Label>
                      <Input
                        id="duration"
                        type="number"
                        required
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="calories">แคลอรี่เผาผลาญ (kcal)</Label>
                    <Input
                      id="calories"
                      type="number"
                      required
                      value={formData.calories}
                      onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">*คำนวณอัตโนมัติตามประเภทและระยะทาง</p>
                  </div>

                  <Button type="submit" className="w-full">บันทึกกิจกรรม</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="animate-scale-in">
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-1">กิจกรรมทั้งหมด</div>
                <div className="text-3xl font-bold text-primary">{activities.length}</div>
                <div className="text-xs text-muted-foreground mt-1">กิจกรรม</div>
              </CardContent>
            </Card>
            <Card className="animate-scale-in" style={{ animationDelay: "100ms" }}>
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-1">ระยะทางรวม</div>
                <div className="text-3xl font-bold text-primary">
                  {activities.reduce((sum, a) => sum + parseFloat(a.distance), 0).toFixed(1)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">กิโลเมตร</div>
              </CardContent>
            </Card>
            <Card className="animate-scale-in" style={{ animationDelay: "200ms" }}>
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-1">แคลอรี่รวม</div>
                <div className="text-3xl font-bold text-primary">
                  {activities.reduce((sum, a) => sum + parseFloat(a.calories), 0).toFixed(0)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">kcal</div>
              </CardContent>
            </Card>
          </div>

          {/* Activities List */}
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle>ประวัติกิจกรรม</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activities.map((activity) => {
                  const activityType = activityTypes.find((t) => t.value === activity.type);
                  return (
                    <div
                      key={activity.id}
                      className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center text-2xl flex-shrink-0">
                        {activityType?.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-lg">{activity.type}</div>
                        <div className="text-sm text-muted-foreground">
                          {activity.distance} km • {activity.duration} นาที • {activity.calories} kcal
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {new Date(activity.date).toLocaleString("th-TH")}
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDelete(activity.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Activities;
