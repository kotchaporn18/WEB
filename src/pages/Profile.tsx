import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, Calendar, Weight, Ruler, Award, Activity, Target, LogOut } from "lucide-react";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  
  // Mock user data - in real app, this would come from localStorage or API
  const [userData, setUserData] = useState({
    username: "healthuser",
    firstName: "สมชาย",
    lastName: "ใจดี",
    email: "somchai@example.com",
    phone: "08-1234-5678",
    dateOfBirth: "1990-05-15",
    gender: "ชาย",
    weight: 72,
    height: 175,
    bmi: 23.5,
  });

  const [isEditing, setIsEditing] = useState(false);

  const stats = [
    { icon: Activity, label: "กิจกรรมทั้งหมด", value: "45", color: "text-primary" },
    { icon: Target, label: "เป้าหมายสำเร็จ", value: "12", color: "text-green-500" },
    { icon: Award, label: "Badge ที่ได้รับ", value: "8", color: "text-yellow-500" },
  ];

  const achievements = [
    { icon: "🏃", title: "นักวิ่งมือใหม่", desc: "วิ่งครบ 10 กิโลเมตร", date: "2024-01-10" },
    { icon: "💧", title: "ผู้รักน้ำ", desc: "ดื่มน้ำครบเป้าหมาย 7 วันติดต่อกัน", date: "2024-01-15" },
    { icon: "🎯", title: "นักตั้งเป้าหมาย", desc: "บรรลุเป้าหมาย 5 เป้าหมาย", date: "2024-01-20" },
    { icon: "⭐", title: "นักกีฬา", desc: "ออกกำลังกาย 30 วันติดต่อกัน", date: "2024-01-25" },
  ];

  const calculateBMI = () => {
    const heightInM = userData.height / 100;
    const bmi = userData.weight / (heightInM * heightInM);
    return bmi.toFixed(1);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { text: "น้ำหนักน้อย", color: "text-blue-500" };
    if (bmi < 25) return { text: "ปกติ", color: "text-green-500" };
    if (bmi < 30) return { text: "น้ำหนักเกิน", color: "text-yellow-500" };
    return { text: "อ้วน", color: "text-red-500" };
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("บันทึกข้อมูลสำเร็จ!");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast.success("ออกจากระบบสำเร็จ");
    navigate("/");
  };

  const bmi = calculateBMI();
  const bmiCategory = getBMICategory(parseFloat(bmi));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="md:ml-64 pt-16 md:pt-0 pb-20 md:pb-0">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">โปรไฟล์</h1>
            <p className="text-muted-foreground">จัดการข้อมูลส่วนตัวและดูสถิติของคุณ</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Profile Card */}
            <Card className="md:col-span-2 animate-scale-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>ข้อมูลส่วนตัว</CardTitle>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} variant="outline">
                      แก้ไข
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleSave}>บันทึก</Button>
                      <Button onClick={() => setIsEditing(false)} variant="outline">
                        ยกเลิก
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-2xl bg-gradient-primary text-white">
                      {userData.firstName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">
                      {userData.firstName} {userData.lastName}
                    </h3>
                    <p className="text-muted-foreground">@{userData.username}</p>
                  </div>
                </div>

                {/* Personal Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">ชื่อ</Label>
                    <Input
                      id="firstName"
                      value={userData.firstName}
                      disabled={!isEditing}
                      onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">นามสกุล</Label>
                    <Input
                      id="lastName"
                      value={userData.lastName}
                      disabled={!isEditing}
                      onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">อีเมล</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={userData.email}
                      disabled={!isEditing}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={userData.phone}
                      disabled={!isEditing}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">น้ำหนัก (kg)</Label>
                    <div className="flex items-center gap-2">
                      <Weight className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="weight"
                        type="number"
                        value={userData.weight}
                        disabled={!isEditing}
                        onChange={(e) => setUserData({ ...userData, weight: parseFloat(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">ส่วนสูง (cm)</Label>
                    <div className="flex items-center gap-2">
                      <Ruler className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="height"
                        type="number"
                        value={userData.height}
                        disabled={!isEditing}
                        onChange={(e) => setUserData({ ...userData, height: parseFloat(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* BMI & Stats Card */}
            <div className="space-y-6">
              <Card className="animate-scale-in" style={{ animationDelay: "100ms" }}>
                <CardHeader>
                  <CardTitle>BMI</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">{bmi}</div>
                  <div className={`text-lg font-medium ${bmiCategory.color} mb-4`}>{bmiCategory.text}</div>
                  <div className="space-y-2 text-sm text-muted-foreground text-left">
                    <div className="flex justify-between">
                      <span>น้ำหนัก:</span>
                      <span className="font-medium">{userData.weight} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ส่วนสูง:</span>
                      <span className="font-medium">{userData.height} cm</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card className="animate-scale-in" style={{ animationDelay: "200ms" }}>
                <CardHeader>
                  <CardTitle>สถิติ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full bg-muted flex items-center justify-center ${stat.color}`}>
                        <stat.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                        <div className="text-xl font-bold">{stat.value}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Achievements */}
          <Card className="mb-8 animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                Achievements & Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer"
                  >
                    <div className="text-4xl mb-2 text-center">{achievement.icon}</div>
                    <h3 className="font-semibold text-center mb-1">{achievement.title}</h3>
                    <p className="text-xs text-muted-foreground text-center mb-2">{achievement.desc}</p>
                    <p className="text-xs text-muted-foreground text-center">{achievement.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Settings & Logout */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>การตั้งค่า</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                เปลี่ยนรหัสผ่าน
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="mr-2 h-4 w-4" />
                การแจ้งเตือน
              </Button>
              <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                ออกจากระบบ
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
