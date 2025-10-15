import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Flame, Footprints, Droplets, Target, TrendingUp } from "lucide-react";
import Navigation from "@/components/Navigation";

const Dashboard = () => {
  const stats = [
    { icon: Footprints, label: "ก้าวเดิน", value: "8,547", unit: "steps", color: "text-primary" },
    { icon: Flame, label: "แคลอรี่เผาผลาญ", value: "420", unit: "kcal", color: "text-orange-500" },
    { icon: Activity, label: "กิจกรรมวันนี้", value: "2", unit: "activities", color: "text-blue-500" },
    { icon: Droplets, label: "น้ำดื่ม", value: "1.5", unit: "L / 2L", color: "text-cyan-500" },
  ];

  const recentActivities = [
    { type: "วิ่ง", distance: "5.2 km", time: "28 นาที", calories: "312 kcal", date: "วันนี้ 06:30" },
    { type: "เดิน", distance: "3.1 km", time: "45 นาที", calories: "108 kcal", date: "วันนี้ 18:00" },
    { type: "ปั่นจักรยาน", distance: "12.5 km", time: "35 นาที", calories: "245 kcal", date: "เมื่อวาน 07:00" },
  ];

  const goals = [
    { name: "น้ำหนักเป้าหมาย", current: 72, target: 68, unit: "kg", progress: 40 },
    { name: "ออกกำลังกายรายสัปดาห์", current: 4, target: 5, unit: "ครั้ง", progress: 80 },
    { name: "แคลอรี่รายวัน", current: 1650, target: 2000, unit: "kcal", progress: 82 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="md:ml-64 pt-16 md:pt-0 pb-20 md:pb-0">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">สวัสดี, คุณผู้ใช้! 👋</h1>
            <p className="text-muted-foreground">พร้อมที่จะสร้างวันที่ดีที่สุดของคุณแล้วหรือยัง?</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.unit}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Goals Progress */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  เป้าหมายของคุณ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {goals.map((goal, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{goal.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {goal.current} / {goal.target} {goal.unit}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  กิจกรรมล่าสุด
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                        <Activity className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{activity.type}</div>
                        <div className="text-sm text-muted-foreground">
                          {activity.distance} • {activity.time} • {activity.calories}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{activity.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>เริ่มต้นใช้งาน</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="p-4 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all">
                  <Activity className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-sm font-medium">บันทึกกิจกรรม</div>
                </button>
                <button className="p-4 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all">
                  <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-sm font-medium">บันทึกอาหาร</div>
                </button>
                <button className="p-4 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all">
                  <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-sm font-medium">ตั้งเป้าหมาย</div>
                </button>
                <button className="p-4 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all">
                  <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-sm font-medium">ดูสถิติ</div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
