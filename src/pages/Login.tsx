import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Activity } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple demo login - in real app, validate against stored user
    const storedUser = localStorage.getItem("currentUser");
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.username === username && user.password === password) {
        toast.success("เข้าสู่ระบบสำเร็จ!");
        navigate("/dashboard");
        return;
      }
    }
    
    // Demo: Allow any login for testing
    toast.success("เข้าสู่ระบบสำเร็จ!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-scale-in">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Activity className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl">เข้าสู่ระบบ</CardTitle>
          <CardDescription>ยินดีต้อนรับกลับมา!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">ชื่อผู้ใช้</Label>
              <Input
                id="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="กรอกชื่อผู้ใช้"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">รหัสผ่าน</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="กรอกรหัสผ่าน"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm cursor-pointer">
                  จดจำฉันไว้
                </Label>
              </div>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                ลืมรหัสผ่าน?
              </Link>
            </div>

            <Button type="submit" className="w-full" size="lg">
              เข้าสู่ระบบ
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              ยังไม่มีบัญชี?{" "}
              <Link to="/register" className="text-primary hover:underline font-medium">
                สมัครสมาชิก
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
