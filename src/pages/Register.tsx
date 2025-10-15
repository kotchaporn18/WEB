import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Activity } from "lucide-react";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "",
    dateOfBirth: undefined as Date | undefined,
    weight: "",
    height: "",
  });

  const calculateBMI = () => {
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height) / 100; // convert cm to m
    if (weight && height) {
      const bmi = weight / (height * height);
      return bmi.toFixed(1);
    }
    return null;
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { text: "น้ำหนักน้อย", color: "text-blue-500" };
    if (bmi < 25) return { text: "ปกติ", color: "text-green-500" };
    if (bmi < 30) return { text: "น้ำหนักเกิน", color: "text-yellow-500" };
    return { text: "อожีน", color: "text-red-500" };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("รหัสผ่านไม่ตรงกัน");
      return;
    }

    if (!formData.gender || !formData.dateOfBirth) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    // Store user data in localStorage
    const userData = {
      ...formData,
      id: Date.now().toString(),
      dateOfBirth: formData.dateOfBirth?.toISOString(),
      bmi: calculateBMI(),
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("currentUser", JSON.stringify(userData));
    toast.success("สมัครสมาชิกสำเร็จ!");
    navigate("/dashboard");
  };

  const bmi = calculateBMI();
  const bmiCategory = bmi ? getBMICategory(parseFloat(bmi)) : null;

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl animate-scale-in">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Activity className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl">สมัครสมาชิก</CardTitle>
          <CardDescription>เริ่มต้นการเดินทางสู่สุขภาพที่ดีขึ้น</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Account Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">ชื่อผู้ใช้ *</Label>
                <Input
                  id="username"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">อีเมล *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">รหัสผ่าน *</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">ยืนยันรหัสผ่าน *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>
            </div>

            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">ชื่อ *</Label>
                <Input
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">นามสกุล *</Label>
                <Input
                  id="lastName"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">เบอร์โทรศัพท์ *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              
            </div>

            

            {/* Health Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">น้ำหนัก (kg) *</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  required
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">ส่วนสูง (cm) *</Label>
                <Input
                  id="height"
                  type="number"
                  step="0.1"
                  required
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                />
              </div>
            </div>

            {/* BMI Display */}
            {bmi && bmiCategory && (
              <div className="p-4 bg-muted rounded-lg text-center animate-fade-in">
                <p className="text-sm text-muted-foreground mb-1">BMI ของคุณ</p>
                <p className="text-3xl font-bold text-primary">{bmi}</p>
                <p className={`text-sm font-medium ${bmiCategory.color}`}>{bmiCategory.text}</p>
              </div>
            )}

            <Button type="submit" className="w-full" size="lg">
              สมัครสมาชิก
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              มีบัญชีอยู่แล้ว?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                เข้าสู่ระบบ
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
