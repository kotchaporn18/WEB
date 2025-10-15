import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Heart, Target, TrendingUp, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  const features = [
    {
      icon: Activity,
      title: "Track Activities",
      description: "บันทึกการออกกำลังกายทุกประเภท วิ่ง เดิน ปั่นจักรยาน และอื่นๆ",
    },
    {
      icon: Heart,
      title: "Nutrition Log",
      description: "จดบันทึกอาหารและแคลอรี่ติดตามโภชนาการรายวัน",
    },
    {
      icon: Target,
      title: "Set Goals",
      description: "ตั้งเป้าหมายสุขภาพของคุณ และติดตามความก้าวหน้า",
    },
    {
      icon: TrendingUp,
      title: "Analytics",
      description: "ดูสถิติและกราฟวิเคราะห์สุขภาพของคุณ",
    },
    {
      icon: Users,
      title: "Social & Challenges",
      description: "เชื่อมต่อกับเพื่อน เข้าร่วมกลุ่ม และแข่งขัน Challenge",
    },
    {
      icon: Award,
      title: "Rewards System",
      description: "รับ badge และรางวัลเมื่อบรรลุเป้าหมาย",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Health Journey
              <br />
              <span className="text-accent">Starts Here</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
              ติดตามสุขภาพ ตั้งเป้าหมาย และบรรลุความฝันด้านสุขภาพของคุณ
              <br />
              ด้วยระบบที่ครบครันและใช้งานง่าย
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                  เริ่มต้นใช้งานฟรี
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white/30 hover:bg-white/20 text-white">
                  เข้าสู่ระบบ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ฟีเจอร์ที่ครบครัน
            </h2>
            <p className="text-lg text-muted-foreground">
              เครื่องมือที่คุณต้องการเพื่อดูแลสุขภาพอย่างครบวงจร
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary hover:shadow-lg transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10K+</div>
              <div className="text-lg text-muted-foreground">Active Users</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50K+</div>
              <div className="text-lg text-muted-foreground">Activities Logged</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">95%</div>
              <div className="text-lg text-muted-foreground">User Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
            พร้อมที่จะเริ่มต้นแล้วหรือยัง?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 animate-fade-in">
            เข้าร่วมกับผู้ใช้งานหลายพันคนที่กำลังเปลี่ยนแปลงชีวิตของพวกเขา
          </p>
          <Link to="/register">
            <Button size="lg" className="text-lg px-12 py-6 animate-scale-in">
              สมัครสมาชิกฟรีวันนี้
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>© 2024 HealthTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
